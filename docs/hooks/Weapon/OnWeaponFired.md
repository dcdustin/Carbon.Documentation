# OnWeaponFired
<Badge type="info" text="Weapon"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a weapon is fired (a shot is taken).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnWeaponFired(BaseProjectile baseProjectile, BasePlayer player, ItemModProjectile local3, ProtoBuf.ProjectileShoot local2)
{
	Puts("OnWeaponFired has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseProjectile]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
[BaseEntity.RPC_Server.IsActiveItem]
public void CLProject(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!VerifyClientAttack(player))
	{
		SendNetworkUpdate();
		return;
	}
	if (reloadFinished && HasReloadCooldown())
	{
		AntiHack.Log(player, AntiHackType.ProjectileHack, "Reloading (" + base.ShortPrefabName + ")");
		player.stats.combat.LogInvalid(player, this, "reload_cooldown");
		return;
	}
	reloadStarted = false;
	reloadFinished = false;
	if (primaryMagazine.contents <= 0 && !base.UsingInfiniteAmmoCheat)
	{
		AntiHack.Log(player, AntiHackType.ProjectileHack, "Magazine empty (" + base.ShortPrefabName + ")");
		player.stats.combat.LogInvalid(player, this, "ammo_missing");
		return;
	}
	ItemDefinition primaryMagazineAmmo = PrimaryMagazineAmmo;
	ProtoBuf.ProjectileShoot projectileShoot = ProtoBuf.ProjectileShoot.Deserialize(msg.read);
	if (primaryMagazineAmmo.itemid != projectileShoot.ammoType)
	{
		AntiHack.Log(player, AntiHackType.ProjectileHack, "Ammo mismatch (" + base.ShortPrefabName + ")");
		player.stats.combat.LogInvalid(player, this, "ammo_mismatch");
		return;
	}
	if (!base.UsingInfiniteAmmoCheat)
	{
		ModifyAmmoCount(-1);
	}
	ItemModProjectile component = primaryMagazineAmmo.GetComponent<ItemModProjectile>();
	if (component == null)
	{
		AntiHack.Log(player, AntiHackType.ProjectileHack, "Item mod not found (" + base.ShortPrefabName + ")");
		player.stats.combat.LogInvalid(player, this, "mod_missing");
	}
	else if (projectileShoot.projectiles.Count > component.numProjectiles)
	{
		AntiHack.Log(player, AntiHackType.ProjectileHack, "Count mismatch (" + base.ShortPrefabName + ")");
		player.stats.combat.LogInvalid(player, this, "count_mismatch");
	}
	else
	{
		if (player.InGesture)
		{
			return;
		}
		SignalBroadcast(BaseEntity.Signal.Attack, string.Empty, msg.connection, GetAttackEffect());
		player.CleanupExpiredProjectiles();
		System.Guid projectileGroupId = System.Guid.NewGuid();
		foreach (ProtoBuf.ProjectileShoot.Projectile projectile in projectileShoot.projectiles)
		{
			if (player.HasFiredProjectile(projectile.projectileID))
			{
				AntiHack.Log(player, AntiHackType.ProjectileHack, "Duplicate ID (" + projectile.projectileID + ")");
				player.stats.combat.LogInvalid(player, this, "duplicate_id");
				continue;
			}
			UnityEngine.Vector3 positionOffset = UnityEngine.Vector3.zero;
			if (ConVar.AntiHack.projectile_positionoffset && (player.isMounted || player.HasParent()))
			{
				if (!ValidateEyePos(player, projectile.startPos, checkLineOfSight: false))
				{
					continue;
				}
				UnityEngine.Vector3 position = player.eyes.position;
				positionOffset = position - projectile.startPos;
				projectile.startPos = position;
			}
			else if (!ValidateEyePos(player, projectile.startPos))
			{
				continue;
			}
			player.NoteFiredProjectile(projectile.projectileID, projectile.startPos, projectile.startVel, this, primaryMagazineAmmo, projectileGroupId, positionOffset);
			CreateProjectileEffectClientside(component.projectileObject.resourcePath, projectile.startPos, projectile.startVel, projectile.seed, msg.connection, IsSilenced());
		}
		player.MakeNoise(player.transform.position, BaseCombatEntity.ActionVolume.Loud);
		SingletonComponent<NpcNoiseManager>.Instance.OnWeaponShot(player, this);
		player.stats.Add(component.category + "_fired", System.Linq.Enumerable.Count(projectileShoot.projectiles), (Stats)5);
		player.LifeStoryShotFired(this);
		StartAttackCooldown(ScaleRepeatDelay(repeatDelay) + animationDelay);
		player.MarkHostileFor();
		UpdateItemCondition();
		DidAttackServerside();
		BaseMountable mounted = player.GetMounted();
		if (mounted != null)
		{
			mounted.OnWeaponFired(this);
		}
		EACServer.LogPlayerUseWeapon(player, this);
	}
}

```
:::
