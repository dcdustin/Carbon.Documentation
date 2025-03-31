<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerAttack [Projectile]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
public void OnProjectileAttack(BaseEntity.RPCMessage msg)
{
	ProtoBuf.PlayerProjectileAttack playerProjectileAttack = ProtoBuf.PlayerProjectileAttack.Deserialize(msg.read);
	if (playerProjectileAttack == null)
	{
		return;
	}
	ProtoBuf.PlayerAttack playerAttack = playerProjectileAttack.playerAttack;
	HitInfo hitInfo = new HitInfo();
	hitInfo.LoadFromAttack(playerAttack.attack, serverSide: true);
	hitInfo.Initiator = this;
	hitInfo.ProjectileID = playerAttack.projectileID;
	hitInfo.ProjectileDistance = playerProjectileAttack.hitDistance;
	hitInfo.ProjectileVelocity = playerProjectileAttack.hitVelocity;
	hitInfo.ProjectileTravelTime = playerProjectileAttack.travelTime;
	hitInfo.Predicted = msg.connection;
	if (hitInfo.IsNaNOrInfinity() || float.IsNaN(playerProjectileAttack.travelTime) || float.IsInfinity(playerProjectileAttack.travelTime))
	{
		AntiHack.Log(this, AntiHackType.ProjectileHack, "Contains NaN (" + playerAttack.projectileID + ")");
		playerProjectileAttack.ResetToPool();
		playerProjectileAttack = null;
		stats.combat.LogInvalid(hitInfo, "projectile_nan");
		return;
	}
	if (!firedProjectiles.TryGetValue(playerAttack.projectileID, out var value))
	{
		AntiHack.Log(this, AntiHackType.ProjectileHack, "Missing ID (" + playerAttack.projectileID + ")", logToAnalytics: false);
		playerProjectileAttack.ResetToPool();
		playerProjectileAttack = null;
		stats.combat.LogInvalid(hitInfo, "projectile_invalid");
		return;
	}
	hitInfo.ProjectileHits = value.hits;
	hitInfo.ProjectileIntegrity = value.integrity;
	hitInfo.ProjectileTrajectoryMismatch = value.trajectoryMismatch;
	if (value.integrity <= 0f)
	{
		AntiHack.Log(this, AntiHackType.ProjectileHack, "Integrity is zero (" + playerAttack.projectileID + ")");
		Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
		playerProjectileAttack.ResetToPool();
		playerProjectileAttack = null;
		stats.combat.LogInvalid(hitInfo, "projectile_integrity");
		return;
	}
	if (value.firedTime < UnityEngine.Time.realtimeSinceStartup - 8f)
	{
		AntiHack.Log(this, AntiHackType.ProjectileHack, "Lifetime is zero (" + playerAttack.projectileID + ")");
		Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
		playerProjectileAttack.ResetToPool();
		playerProjectileAttack = null;
		stats.combat.LogInvalid(hitInfo, "projectile_lifetime");
		return;
	}
	if (value.ricochets > 0)
	{
		AntiHack.Log(this, AntiHackType.ProjectileHack, "Projectile is ricochet (" + playerAttack.projectileID + ")");
		Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
		playerProjectileAttack.ResetToPool();
		playerProjectileAttack = null;
		stats.combat.LogInvalid(hitInfo, "projectile_ricochet");
		return;
	}
	hitInfo.Weapon = value.weaponSource;
	hitInfo.WeaponPrefab = value.weaponPrefab;
	hitInfo.ProjectilePrefab = value.projectilePrefab;
	hitInfo.damageProperties = value.projectilePrefab.damageProperties;
	UnityEngine.Vector3 position = value.position;
	UnityEngine.Vector3 initialPositionOffset = value.initialPositionOffset;
	UnityEngine.Vector3 positionOffset = value.positionOffset;
	UnityEngine.Vector3 velocity = value.velocity;
	float partialTime = value.partialTime;
	float travelTime = value.travelTime;
	float num = UnityEngine.Mathf.Clamp(playerProjectileAttack.travelTime, value.travelTime, 8f);
	UnityEngine.Vector3 gravity = UnityEngine.Physics.gravity * value.projectilePrefab.gravityModifier;
	float drag = value.projectilePrefab.drag;
	BaseEntity hitEntity = hitInfo.HitEntity;
	BasePlayer basePlayer = hitEntity as BasePlayer;
	bool flag = basePlayer != null;
	bool flag2 = flag && basePlayer.IsSleeping();
	bool flag3 = flag && basePlayer.IsWounded();
	bool flag4 = flag && basePlayer.isMounted;
	bool flag5 = flag && basePlayer.HasParent();
	bool flag6 = hitEntity != null;
	bool flag7 = flag6 && hitEntity.IsNpc;
	bool flag8 = hitInfo.HitMaterial == Projectile.WaterMaterialID();
	bool flag9;
	int num15;
	UnityEngine.Vector3 position2;
	UnityEngine.Vector3 pointStart;
	UnityEngine.Vector3 hitPositionWorld;
	UnityEngine.Vector3 vector;
	bool flag10;
	int num32;
	if (value.protection > 0)
	{
		flag9 = true;
		float num2 = 1f + ConVar.AntiHack.projectile_forgiveness;
		float num3 = 1f - ConVar.AntiHack.projectile_forgiveness;
		float projectile_clientframes = ConVar.AntiHack.projectile_clientframes;
		float projectile_serverframes = ConVar.AntiHack.projectile_serverframes;
		float num4 = Mathx.Decrement(value.firedTime);
		float num5 = UnityEngine.Mathf.Clamp(Mathx.Increment(UnityEngine.Time.realtimeSinceStartup) - num4, 0f, 8f);
		float num6 = num;
		float num7 = (value.desyncLifeTime = UnityEngine.Mathf.Abs(num5 - num6));
		float num8 = UnityEngine.Mathf.Min(num5, num6);
		float num9 = projectile_clientframes / 60f;
		float num10 = projectile_serverframes * Mathx.Max(UnityEngine.Time.deltaTime, UnityEngine.Time.smoothDeltaTime, UnityEngine.Time.fixedDeltaTime);
		float num11 = (desyncTimeClamped + num8 + num9 + num10) * num2;
		float num12 = ((value.protection >= 6) ? ((desyncTimeClamped + num9 + num10) * num2) : num11);
		float num13 = (num5 - desyncTimeClamped - num9 - num10) * num3;
		float num14 = UnityEngine.Vector3.Distance(value.initialPosition, hitInfo.HitPositionWorld);
		num15 = 1075904512;
		if (ConVar.AntiHack.projectile_terraincheck)
		{
			num15 |= 0x800000;
		}
		if (ConVar.AntiHack.projectile_vehiclecheck)
		{
			num15 |= 0x8000000;
		}
		if (flag6 && net.group != null && hitEntity.net != null && hitEntity.net.group != null && !net.subscriber.IsSubscribed(hitEntity.net.group))
		{
			AntiHack.Log(this, AntiHackType.ProjectileHack, "Entity out of network range");
			stats.combat.LogInvalid(hitInfo, "projectile_network_range");
			flag9 = false;
		}
		if (flag && hitInfo.boneArea == (HitArea)(-1))
		{
			string text = hitInfo.ProjectilePrefab.name;
			string text2 = (flag6 ? hitEntity.ShortPrefabName : "world");
			AntiHack.Log(this, AntiHackType.ProjectileHack, "Bone is invalid (" + text + " on " + text2 + " bone " + hitInfo.HitBone + ")");
			stats.combat.LogInvalid(hitInfo, "projectile_bone");
			flag9 = false;
		}
		if (flag8)
		{
			if (flag6)
			{
				string text3 = hitInfo.ProjectilePrefab.name;
				string text4 = (flag6 ? hitEntity.ShortPrefabName : "world");
				AntiHack.Log(this, AntiHackType.ProjectileHack, "Projectile water hit on entity (" + text3 + " on " + text4 + ")");
				Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
				stats.combat.LogInvalid(hitInfo, "water_entity");
				flag9 = false;
			}
			if (!WaterLevel.Test(hitInfo.HitPositionWorld - 0.5f * UnityEngine.Vector3.up, waves: true, volumes: true, this))
			{
				string text5 = hitInfo.ProjectilePrefab.name;
				string text6 = (flag6 ? hitEntity.ShortPrefabName : "world");
				AntiHack.Log(this, AntiHackType.ProjectileHack, "Projectile water level (" + text5 + " on " + text6 + ")");
				Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
				stats.combat.LogInvalid(hitInfo, "water_level");
				flag9 = false;
			}
		}
		if (value.protection >= 2)
		{
			if (flag6 || (value.protection < 6 && flag))
			{
				float num16 = hitEntity.MaxVelocity() + hitEntity.GetParentVelocity().magnitude;
				float num17 = hitEntity.BoundsPadding() + num12 * num16;
				float num18 = (value.entityDistance = hitEntity.Distance(hitInfo.HitPositionWorld));
				if (num18 > num17)
				{
					string text7 = hitInfo.ProjectilePrefab.name;
					string shortPrefabName = hitEntity.ShortPrefabName;
					AntiHack.Log(this, AntiHackType.ProjectileHack, "Entity too far away (" + text7 + " on " + shortPrefabName + " with " + num18 + "m > " + num17 + "m in " + num12 + "s)");
					Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
					stats.combat.LogInvalid(hitInfo, "entity_distance");
					flag9 = false;
				}
			}
			if (value.protection >= 6 && flag9 && flag && !flag7 && !flag2 && !flag3 && !flag4 && !flag5)
			{
				float magnitude = basePlayer.GetParentVelocity().magnitude;
				float num19 = basePlayer.BoundsPadding() + num12 * magnitude + ConVar.AntiHack.tickhistoryforgiveness;
				float num20 = (value.entityDistance = basePlayer.tickHistory.Distance(basePlayer, hitInfo.HitPositionWorld));
				if (num20 > num19)
				{
					string text8 = hitInfo.ProjectilePrefab.name;
					string shortPrefabName2 = basePlayer.ShortPrefabName;
					AntiHack.Log(this, AntiHackType.ProjectileHack, "Player too far away (" + text8 + " on " + shortPrefabName2 + " with " + num20 + "m > " + num19 + "m in " + num12 + "s)");
					Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
					stats.combat.LogInvalid(hitInfo, "player_distance");
					flag9 = false;
				}
			}
		}
		if (value.protection >= 1)
		{
			float num21 = (flag6 ? (hitEntity.MaxVelocity() + hitEntity.GetParentVelocity().magnitude) : 0f);
			float num22 = (flag6 ? (num12 * num21) : 0f);
			float magnitude2 = value.initialVelocity.magnitude;
			float num23 = hitInfo.ProjectilePrefab.initialDistance + num11 * magnitude2;
			float num24 = hitInfo.ProjectileDistance + 1f + positionOffset.magnitude + num22 + estimatedVelocity.magnitude;
			if (num14 > num23)
			{
				string text9 = hitInfo.ProjectilePrefab.name;
				string text10 = (flag6 ? hitEntity.ShortPrefabName : "world");
				AntiHack.Log(this, AntiHackType.ProjectileHack, "Projectile too fast (" + text9 + " on " + text10 + " with " + num14 + "m > " + num23 + "m in " + num11 + "s)");
				Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
				stats.combat.LogInvalid(hitInfo, "projectile_maxspeed");
				flag9 = false;
			}
			if (num14 > num24)
			{
				string text11 = hitInfo.ProjectilePrefab.name;
				string text12 = (flag6 ? hitEntity.ShortPrefabName : "world");
				AntiHack.Log(this, AntiHackType.ProjectileHack, "Projectile too far away (" + text11 + " on " + text12 + " with " + num14 + "m > " + num24 + "m in " + num11 + "s)");
				Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
				stats.combat.LogInvalid(hitInfo, "projectile_distance");
				flag9 = false;
			}
			if (num7 > ConVar.AntiHack.projectile_desync)
			{
				string text13 = hitInfo.ProjectilePrefab.name;
				string text14 = (flag6 ? hitEntity.ShortPrefabName : "world");
				AntiHack.Log(this, AntiHackType.ProjectileHack, "Projectile desync (" + text13 + " on " + text14 + " with " + num7 + "s > " + ConVar.AntiHack.projectile_desync + "s)");
				Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
				stats.combat.LogInvalid(hitInfo, "projectile_desync");
				flag9 = false;
			}
		}
		if (value.protection >= 4)
		{
			float num25 = 0f;
			if (flag6)
			{
				float num26 = hitEntity.GetParentVelocity().magnitude;
				if (hitEntity is CargoShip || hitEntity is Tugboat)
				{
					num26 += hitEntity.MaxVelocity();
				}
				num25 = num12 * num26;
			}
			SimulateProjectile(ref position, ref velocity, ref partialTime, num - travelTime, gravity, drag, out var prevPosition, out var prevVelocity);
			Line line = new Line(prevPosition - prevVelocity, position + prevVelocity);
			float num27 = (value.startPointMismatch = UnityEngine.Mathf.Max(line.Distance(hitInfo.PointStart) - initialPositionOffset.magnitude - num25, 0f));
			float num28 = (value.endPointMismatch = UnityEngine.Mathf.Max(line.Distance(hitInfo.HitPositionWorld) - initialPositionOffset.magnitude - num25, 0f));
			if (num27 > ConVar.AntiHack.projectile_trajectory)
			{
				string text15 = value.projectilePrefab.name;
				string text16 = (flag6 ? hitEntity.ShortPrefabName : "world");
				AntiHack.Log(this, AntiHackType.ProjectileHack, "Start position trajectory (" + text15 + " on " + text16 + " with " + num27 + "m > " + ConVar.AntiHack.projectile_trajectory + "m)");
				Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
				stats.combat.LogInvalid(hitInfo, "trajectory_start");
				flag9 = false;
			}
			if (num28 > ConVar.AntiHack.projectile_trajectory)
			{
				string text17 = value.projectilePrefab.name;
				string text18 = (flag6 ? hitEntity.ShortPrefabName : "world");
				AntiHack.Log(this, AntiHackType.ProjectileHack, "End position trajectory (" + text17 + " on " + text18 + " with " + num28 + "m > " + ConVar.AntiHack.projectile_trajectory + "m)");
				Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
				stats.combat.LogInvalid(hitInfo, "trajectory_end");
				flag9 = false;
			}
			if (hitInfo.ProjectileTrajectoryMismatch > ConVar.AntiHack.projectile_trajectory_update)
			{
				string text19 = value.projectilePrefab.name;
				string text20 = (flag6 ? hitEntity.ShortPrefabName : "world");
				AntiHack.Log(this, AntiHackType.ProjectileHack, "Update position trajectory (" + text19 + " on " + text20 + " with " + hitInfo.ProjectileTrajectoryMismatch + "m > " + ConVar.AntiHack.projectile_trajectory + "m)");
				Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
				stats.combat.LogInvalid(hitInfo, "trajectory_update_total");
				flag9 = false;
			}
			hitInfo.ProjectileVelocity = velocity;
			if (playerProjectileAttack.hitVelocity != UnityEngine.Vector3.zero && velocity != UnityEngine.Vector3.zero)
			{
				float num29 = UnityEngine.Vector3.Angle(playerProjectileAttack.hitVelocity, velocity);
				float num30 = playerProjectileAttack.hitVelocity.magnitude / velocity.magnitude;
				if (num29 > ConVar.AntiHack.projectile_anglechange)
				{
					string text21 = value.projectilePrefab.name;
					string text22 = (flag6 ? hitEntity.ShortPrefabName : "world");
					AntiHack.Log(this, AntiHackType.ProjectileHack, "Trajectory angle change (" + text21 + " on " + text22 + " with " + num29 + "deg > " + ConVar.AntiHack.projectile_anglechange + "deg)");
					Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
					stats.combat.LogInvalid(hitInfo, "angle_change");
					flag9 = false;
				}
				if (num30 > ConVar.AntiHack.projectile_velocitychange)
				{
					string text23 = value.projectilePrefab.name;
					string text24 = (flag6 ? hitEntity.ShortPrefabName : "world");
					AntiHack.Log(this, AntiHackType.ProjectileHack, "Trajectory velocity change (" + text23 + " on " + text24 + " with " + num30 + " > " + ConVar.AntiHack.projectile_velocitychange + ")");
					Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
					stats.combat.LogInvalid(hitInfo, "velocity_change");
					flag9 = false;
				}
			}
			float magnitude3 = velocity.magnitude;
			float num31 = num13 * magnitude3;
			if (num14 < num31)
			{
				string text25 = hitInfo.ProjectilePrefab.name;
				string text26 = (flag6 ? hitEntity.ShortPrefabName : "world");
				AntiHack.Log(this, AntiHackType.ProjectileHack, "Projectile too slow (" + text25 + " on " + text26 + " with " + num14 + "m < " + num31 + "m in " + num13 + "s)");
				Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
				stats.combat.LogInvalid(hitInfo, "projectile_minspeed");
				flag9 = false;
			}
		}
		if (value.protection >= 3)
		{
			position2 = value.position;
			pointStart = hitInfo.PointStart;
			hitPositionWorld = hitInfo.HitPositionWorld;
			if (!flag8)
			{
				hitPositionWorld -= hitInfo.ProjectileVelocity.normalized * 0.001f;
			}
			vector = hitInfo.PositionOnRay(hitPositionWorld);
			UnityEngine.Vector3 vector2 = UnityEngine.Vector3.zero;
			UnityEngine.Vector3 vector3 = UnityEngine.Vector3.zero;
			if (ConVar.AntiHack.projectile_backtracking > 0f)
			{
				vector2 = (pointStart - position2).normalized * ConVar.AntiHack.projectile_backtracking;
				vector3 = (vector - pointStart).normalized * ConVar.AntiHack.projectile_backtracking;
			}
			flag10 = GamePhysics.LineOfSight(position2 - vector2, pointStart + vector2, num15, value.lastEntityHit) && GamePhysics.LineOfSight(pointStart - vector3, vector, num15, value.lastEntityHit) && GamePhysics.LineOfSight(vector, hitPositionWorld, num15, value.lastEntityHit);
			bool flag11 = true;
			if (flag10)
			{
				flag11 = GamePhysics.LineOfSight(position2, hitPositionWorld, num15, value.lastEntityHit) && GamePhysics.LineOfSight(hitPositionWorld, position2, num15, value.lastEntityHit);
			}
			bool flag12 = true;
			if (flag10)
			{
				System.Collections.Generic.List<UnityEngine.Vector3> simulatedPositions = value.simulatedPositions;
				if (simulatedPositions.Count > ConVar.AntiHack.projectile_update_limit)
				{
					flag12 = false;
				}
				else
				{
					simulatedPositions.Add(position2);
					for (int i = 1; i < simulatedPositions.Count; i++)
					{
						if (!GamePhysics.LineOfSight(simulatedPositions[i - 1], simulatedPositions[i], num15, value.lastEntityHit) || !GamePhysics.LineOfSight(simulatedPositions[i], simulatedPositions[i - 1], num15, value.lastEntityHit))
						{
							flag12 = false;
							break;
						}
					}
				}
			}
			if (flag10)
			{
				if (!(value.simulatedPositions.Count > 1 && flag12))
				{
					num32 = ((value.simulatedPositions.Count <= 1 && flag11) ? 1 : 0);
					if (num32 == 0)
					{
						goto IL_12c5;
					}
				}
				else
				{
					num32 = 1;
				}
				stats.Add("hit_" + (flag6 ? hitEntity.Categorize() : "world") + "_direct_los", 1, Stats.Server);
				goto IL_1323;
			}
			num32 = 0;
			goto IL_12c5;
		}
		goto IL_1595;
	}
	goto IL_15ae;
	IL_15ae:
	value.position = hitInfo.HitPositionWorld;
	value.velocity = playerProjectileAttack.hitVelocity;
	value.travelTime = num;
	value.partialTime = partialTime;
	value.hits++;
	value.lastEntityHit = hitEntity;
	value.simulatedPositions.Clear();
	value.simulatedPositions.Add(position);
	hitInfo.ProjectilePrefab.CalculateDamage(hitInfo, value.projectileModifier, value.integrity);
	if (flag8)
	{
		if (hitInfo.ProjectilePrefab.waterIntegrityLoss > 0f)
		{
			value.integrity = UnityEngine.Mathf.Clamp01(value.integrity - hitInfo.ProjectilePrefab.waterIntegrityLoss);
		}
	}
	else if (hitInfo.ProjectilePrefab.penetrationPower <= 0f || !flag6)
	{
		value.integrity = 0f;
	}
	else
	{
		float num33 = hitEntity.PenetrationResistance(hitInfo) / hitInfo.ProjectilePrefab.penetrationPower;
		value.integrity = UnityEngine.Mathf.Clamp01(value.integrity - num33);
	}
	if (flag6)
	{
		stats.Add(value.itemMod.category + "_hit_" + hitEntity.Categorize(), 1);
	}
	if (value.integrity <= 0f)
	{
		if (hitInfo.ProjectilePrefab.remainInWorld)
		{
			CreateWorldProjectile(hitInfo, value.itemDef, value.itemMod, hitInfo.ProjectilePrefab, value.pickupItem);
		}
		if (value.hits <= ConVar.AntiHack.projectile_impactspawndepth)
		{
			value.itemMod.ServerProjectileHit(hitInfo);
		}
	}
	else if (value.hits == ConVar.AntiHack.projectile_impactspawndepth)
	{
		value.itemMod.ServerProjectileHit(hitInfo);
	}
	firedProjectiles[playerAttack.projectileID] = value;
	if (flag6)
	{
		if (value.hits <= ConVar.AntiHack.projectile_damagedepth)
		{
			hitEntity.OnAttacked(hitInfo);
		}
		else
		{
			stats.combat.LogInvalid(hitInfo, "ricochet");
		}
	}
	Projectile.CustomEffectData clientEffectData = value.projectilePrefab.clientEffectData;
	bool playDefaultHitEffects = value.projectilePrefab.playDefaultHitEffects;
	GameObjectRef clientEffectPrefab = value.projectilePrefab.clientEffectPrefab;
	if (!clientEffectData.UseCustomEffect || playDefaultHitEffects)
	{
		Effect.server.ImpactEffect(hitInfo);
	}
	if (clientEffectData.UseCustomEffect)
	{
		string text27 = null;
		if (clientEffectPrefab != null && clientEffectPrefab.isValid)
		{
			text27 = clientEffectPrefab.resourcePath;
		}
		if (text27 != null)
		{
			Effect.server.ImpactEffect(hitInfo, text27);
		}
	}
	hitInfo.DoHitEffects = hitInfo.ProjectilePrefab.doDefaultHitEffects;
	SingletonComponent<NpcNoiseManager>.Instance.OnProjectileHit(this, hitInfo);
	playerProjectileAttack.ResetToPool();
	playerProjectileAttack = null;
	return;
	IL_12c5:
	stats.Add("hit_" + (flag6 ? hitEntity.Categorize() : "world") + "_indirect_los", 1, Stats.Server);
	goto IL_1323;
	IL_1323:
	if (num32 == 0)
	{
		string text28 = hitInfo.ProjectilePrefab.name;
		string text29 = (flag6 ? hitEntity.ShortPrefabName : "world");
		string description = ((!flag10) ? "projectile_los" : "projectile_los_detailed");
		string[] obj = new string[12]
		{
			"Line of sight (", text28, " on ", text29, ") ", null, null, null, null, null,
			null, null
		};
		UnityEngine.Vector3 vector4 = position2;
		obj[5] = vector4.ToString();
		obj[6] = " ";
		vector4 = pointStart;
		obj[7] = vector4.ToString();
		obj[8] = " ";
		vector4 = vector;
		obj[9] = vector4.ToString();
		obj[10] = " ";
		vector4 = hitPositionWorld;
		obj[11] = vector4.ToString();
		AntiHack.Log(this, AntiHackType.ProjectileHack, string.Concat(obj));
		Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
		stats.combat.LogInvalid(hitInfo, description);
		flag9 = false;
	}
	if (flag9 && flag && !flag7)
	{
		UnityEngine.Vector3 hitPositionWorld2 = hitInfo.HitPositionWorld;
		UnityEngine.Vector3 position3 = basePlayer.eyes.position;
		UnityEngine.Vector3 vector5 = basePlayer.CenterPoint();
		float projectile_losforgiveness = ConVar.AntiHack.projectile_losforgiveness;
		bool flag13 = GamePhysics.LineOfSight(hitPositionWorld2, position3, num15, 0f, projectile_losforgiveness) && GamePhysics.LineOfSight(position3, hitPositionWorld2, num15, projectile_losforgiveness, 0f);
		if (!flag13)
		{
			flag13 = GamePhysics.LineOfSight(hitPositionWorld2, vector5, num15, 0f, projectile_losforgiveness) && GamePhysics.LineOfSight(vector5, hitPositionWorld2, num15, projectile_losforgiveness, 0f);
		}
		if (!flag13)
		{
			string text30 = hitInfo.ProjectilePrefab.name;
			string text31 = (flag6 ? hitEntity.ShortPrefabName : "world");
			string[] obj2 = new string[12]
			{
				"Line of sight (", text30, " on ", text31, ") ", null, null, null, null, null,
				null, null
			};
			UnityEngine.Vector3 vector4 = hitPositionWorld2;
			obj2[5] = vector4.ToString();
			obj2[6] = " ";
			vector4 = position3;
			obj2[7] = vector4.ToString();
			obj2[8] = " or ";
			vector4 = hitPositionWorld2;
			obj2[9] = vector4.ToString();
			obj2[10] = " ";
			vector4 = vector5;
			obj2[11] = vector4.ToString();
			AntiHack.Log(this, AntiHackType.ProjectileHack, string.Concat(obj2));
			Facepunch.Rust.Analytics.Azure.OnProjectileHackViolation(value);
			stats.combat.LogInvalid(hitInfo, "projectile_los");
			flag9 = false;
		}
	}
	goto IL_1595;
	IL_1595:
	if (!flag9)
	{
		AntiHack.AddViolation(this, AntiHackType.ProjectileHack, ConVar.AntiHack.projectile_penalty);
		playerProjectileAttack.ResetToPool();
		playerProjectileAttack = null;
		return;
	}
	goto IL_15ae;
}

```
