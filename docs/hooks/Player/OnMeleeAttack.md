# OnMeleeAttack
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a melee attack is executed by a player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnMeleeAttack(BasePlayer local0, HitInfo local3)
{
	Puts("OnMeleeAttack has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseMelee]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void PlayerAttack(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!VerifyClientAttack(player))
	{
		SendNetworkUpdate();
		return;
	}
	using (TimeWarning.New("PlayerAttack", 50))
	{
		using ProtoBuf.PlayerAttack playerAttack = ProtoBuf.PlayerAttack.Deserialize(msg.read);
		if (playerAttack == null)
		{
			return;
		}
		HitInfo obj = Facepunch.Pool.Get<HitInfo>();
		obj.LoadFromAttack(playerAttack.attack, serverSide: true);
		obj.Initiator = player;
		obj.Weapon = this;
		obj.WeaponPrefab = this;
		obj.Predicted = msg.connection;
		obj.damageProperties = damageProperties;
		if (obj.IsNaNOrInfinity())
		{
			string shortPrefabName = base.ShortPrefabName;
			AntiHack.Log(player, AntiHackType.MeleeHack, "Contains NaN (" + shortPrefabName + ")");
			player.stats.combat.LogInvalid(obj, "melee_nan");
			return;
		}
		BaseEntity hitEntity = obj.HitEntity;
		BasePlayer basePlayer = obj.HitEntity as BasePlayer;
		bool flag = basePlayer != null;
		bool flag2 = flag && basePlayer.IsSleeping();
		bool flag3 = flag && basePlayer.IsWounded();
		bool flag4 = flag && basePlayer.isMounted;
		bool flag5 = flag && basePlayer.HasParent();
		bool flag6 = hitEntity != null;
		bool flag7 = flag6 && hitEntity.IsNpc;
		bool flag8;
		int num5;
		UnityEngine.Vector3 center;
		UnityEngine.Vector3 position;
		UnityEngine.Vector3 pointStart;
		UnityEngine.Vector3 hitPositionWorld;
		UnityEngine.Vector3 vector;
		int num16;
		if (ConVar.AntiHack.melee_protection > 0)
		{
			flag8 = true;
			float num = 1f + ConVar.AntiHack.melee_forgiveness;
			float melee_clientframes = ConVar.AntiHack.melee_clientframes;
			float melee_serverframes = ConVar.AntiHack.melee_serverframes;
			float num2 = melee_clientframes / 60f;
			float num3 = melee_serverframes * Mathx.Max(UnityEngine.Time.deltaTime, UnityEngine.Time.smoothDeltaTime, UnityEngine.Time.fixedDeltaTime);
			float num4 = (player.desyncTimeClamped + num2 + num3) * num;
			num5 = 1075904512;
			if (ConVar.AntiHack.melee_terraincheck)
			{
				num5 |= 0x800000;
			}
			if (ConVar.AntiHack.melee_vehiclecheck)
			{
				num5 |= 0x8000000;
			}
			if (flag && obj.boneArea == (HitArea)(-1))
			{
				string shortPrefabName2 = base.ShortPrefabName;
				string shortPrefabName3 = basePlayer.ShortPrefabName;
				AntiHack.Log(player, AntiHackType.MeleeHack, "Bone is invalid  (" + shortPrefabName2 + " on " + shortPrefabName3 + " bone " + obj.HitBone + ")");
				player.stats.combat.LogInvalid(obj, "melee_bone");
				flag8 = false;
			}
			if (ConVar.AntiHack.melee_protection >= 2)
			{
				if (flag6)
				{
					float num6 = hitEntity.MaxVelocity() + hitEntity.GetParentVelocity().magnitude;
					float num7 = hitEntity.BoundsPadding() + num4 * num6;
					float num8 = hitEntity.Distance(obj.HitPositionWorld);
					if (num8 > num7)
					{
						string shortPrefabName4 = base.ShortPrefabName;
						string shortPrefabName5 = hitEntity.ShortPrefabName;
						AntiHack.Log(player, AntiHackType.MeleeHack, "Entity too far away (" + shortPrefabName4 + " on " + shortPrefabName5 + " with " + num8 + "m > " + num7 + "m in " + num4 + "s)");
						player.stats.combat.LogInvalid(obj, "melee_target");
						flag8 = false;
					}
				}
				if (ConVar.AntiHack.melee_protection >= 4 && flag8 && flag && !flag7 && !flag2 && !flag3 && !flag4 && !flag5)
				{
					float magnitude = basePlayer.GetParentVelocity().magnitude;
					float num9 = basePlayer.BoundsPadding() + num4 * magnitude + ConVar.AntiHack.tickhistoryforgiveness;
					float num10 = basePlayer.tickHistory.Distance(basePlayer, obj.HitPositionWorld);
					if (num10 > num9)
					{
						string shortPrefabName6 = base.ShortPrefabName;
						string shortPrefabName7 = basePlayer.ShortPrefabName;
						AntiHack.Log(player, AntiHackType.MeleeHack, "Player too far away (" + shortPrefabName6 + " on " + shortPrefabName7 + " with " + num10 + "m > " + num9 + "m in " + num4 + "s)");
						player.stats.combat.LogInvalid(obj, "player_distance");
						flag8 = false;
					}
				}
			}
			if (ConVar.AntiHack.melee_protection >= 1)
			{
				if (ConVar.AntiHack.melee_protection >= 4)
				{
					float magnitude2 = player.GetParentVelocity().magnitude;
					float num11 = player.BoundsPadding() + num4 * magnitude2 + num * maxDistance;
					float num12 = player.tickHistory.Distance(player, obj.HitPositionWorld);
					if (num12 > num11)
					{
						string shortPrefabName8 = base.ShortPrefabName;
						string text = (flag6 ? hitEntity.ShortPrefabName : "world");
						AntiHack.Log(player, AntiHackType.MeleeHack, "Initiator too far away (" + shortPrefabName8 + " on " + text + " with " + num12 + "m > " + num11 + "m in " + num4 + "s)");
						player.stats.combat.LogInvalid(obj, "melee_initiator");
						flag8 = false;
					}
				}
				else
				{
					float num13 = player.MaxVelocity() + player.GetParentVelocity().magnitude;
					float num14 = player.BoundsPadding() + num4 * num13 + num * maxDistance;
					float num15 = player.Distance(obj.HitPositionWorld);
					if (num15 > num14)
					{
						string shortPrefabName9 = base.ShortPrefabName;
						string text2 = (flag6 ? hitEntity.ShortPrefabName : "world");
						AntiHack.Log(player, AntiHackType.MeleeHack, "Initiator too far away (" + shortPrefabName9 + " on " + text2 + " with " + num15 + "m > " + num14 + "m in " + num4 + "s)");
						player.stats.combat.LogInvalid(obj, "melee_initiator");
						flag8 = false;
					}
				}
			}
			if (ConVar.AntiHack.melee_protection >= 3)
			{
				if (flag6)
				{
					center = player.eyes.center;
					position = player.eyes.position;
					pointStart = obj.PointStart;
					hitPositionWorld = obj.HitPositionWorld;
					hitPositionWorld -= (hitPositionWorld - pointStart).normalized * 0.001f;
					vector = obj.PositionOnRay(hitPositionWorld);
					UnityEngine.Vector3 vector2 = UnityEngine.Vector3.zero;
					UnityEngine.Vector3 vector3 = UnityEngine.Vector3.zero;
					UnityEngine.Vector3 vector4 = UnityEngine.Vector3.zero;
					if (ConVar.AntiHack.melee_backtracking > 0f)
					{
						vector2 = (position - center).normalized * ConVar.AntiHack.melee_backtracking;
						vector3 = (pointStart - position).normalized * ConVar.AntiHack.melee_backtracking;
						vector4 = (vector - pointStart).normalized * ConVar.AntiHack.melee_backtracking;
					}
					if (GamePhysics.LineOfSight(center - vector2, position + vector2, num5) && GamePhysics.LineOfSight(position - vector3, pointStart + vector3, num5) && GamePhysics.LineOfSight(pointStart - vector4, vector, num5) && GamePhysics.LineOfSight(vector, hitPositionWorld, num5))
					{
						num16 = (GamePhysics.LineOfSight(position, hitPositionWorld, num5) ? 1 : 0);
						if (num16 != 0)
						{
							player.stats.Add("hit_" + hitEntity.Categorize() + "_direct_los", 1, Stats.Server);
							goto IL_07c5;
						}
					}
					else
					{
						num16 = 0;
					}
					player.stats.Add("hit_" + hitEntity.Categorize() + "_indirect_los", 1, Stats.Server);
					goto IL_07c5;
				}
				goto IL_08b3;
			}
			goto IL_0a1a;
		}
		goto IL_0a2c;
		IL_0a1a:
		if (!flag8)
		{
			AntiHack.AddViolation(player, AntiHackType.MeleeHack, ConVar.AntiHack.melee_penalty);
			return;
		}
		goto IL_0a2c;
		IL_07c5:
		if (num16 == 0)
		{
			string shortPrefabName10 = base.ShortPrefabName;
			string shortPrefabName11 = hitEntity.ShortPrefabName;
			string[] obj2 = new string[14]
			{
				"Line of sight (", shortPrefabName10, " on ", shortPrefabName11, ") ", null, null, null, null, null,
				null, null, null, null
			};
			UnityEngine.Vector3 vector5 = center;
			obj2[5] = vector5.ToString();
			obj2[6] = " ";
			vector5 = position;
			obj2[7] = vector5.ToString();
			obj2[8] = " ";
			vector5 = pointStart;
			obj2[9] = vector5.ToString();
			obj2[10] = " ";
			vector5 = vector;
			obj2[11] = vector5.ToString();
			obj2[12] = " ";
			vector5 = hitPositionWorld;
			obj2[13] = vector5.ToString();
			AntiHack.Log(player, AntiHackType.MeleeHack, string.Concat(obj2));
			player.stats.combat.LogInvalid(obj, "melee_los");
			flag8 = false;
		}
		goto IL_08b3;
		IL_0a2c:
		player.metabolism.UseHeart(heartStress * 0.2f);
		using (TimeWarning.New("DoAttackShared", 50))
		{
			DoAttackShared(obj);
		}
		Facepunch.Pool.Free(ref obj);
		return;
		IL_08b3:
		if (flag8 && flag && !flag7)
		{
			UnityEngine.Vector3 hitPositionWorld2 = obj.HitPositionWorld;
			UnityEngine.Vector3 position2 = basePlayer.eyes.position;
			UnityEngine.Vector3 vector6 = basePlayer.CenterPoint();
			float melee_losforgiveness = ConVar.AntiHack.melee_losforgiveness;
			bool flag9 = GamePhysics.LineOfSight(hitPositionWorld2, position2, num5, 0f, melee_losforgiveness) && GamePhysics.LineOfSight(position2, hitPositionWorld2, num5, melee_losforgiveness, 0f);
			if (!flag9)
			{
				flag9 = GamePhysics.LineOfSight(hitPositionWorld2, vector6, num5, 0f, melee_losforgiveness) && GamePhysics.LineOfSight(vector6, hitPositionWorld2, num5, melee_losforgiveness, 0f);
			}
			if (!flag9)
			{
				string shortPrefabName12 = base.ShortPrefabName;
				string shortPrefabName13 = basePlayer.ShortPrefabName;
				string[] obj3 = new string[12]
				{
					"Line of sight (", shortPrefabName12, " on ", shortPrefabName13, ") ", null, null, null, null, null,
					null, null
				};
				UnityEngine.Vector3 vector5 = hitPositionWorld2;
				obj3[5] = vector5.ToString();
				obj3[6] = " ";
				vector5 = position2;
				obj3[7] = vector5.ToString();
				obj3[8] = " or ";
				vector5 = hitPositionWorld2;
				obj3[9] = vector5.ToString();
				obj3[10] = " ";
				vector5 = vector6;
				obj3[11] = vector5.ToString();
				AntiHack.Log(player, AntiHackType.MeleeHack, string.Concat(obj3));
				player.stats.combat.LogInvalid(obj, "melee_los");
				flag8 = false;
			}
		}
		goto IL_0a1a;
	}
}

```
:::
