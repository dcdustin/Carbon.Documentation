<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSiegeWeaponFire [Ballista]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
[BaseEntity.RPC_Server.IsVisible(3f)]
[BaseEntity.RPC_Server.FromOwner(true)]
[BaseEntity.RPC_Server.CallsPerSecond(1uL)]
public void SERVER_FireClientProjectile(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (player == null)
	{
		return;
	}
	if (!VerifyClientRPC(player))
	{
		SendNetworkUpdate();
	}
	else
	{
		if (!IsLoaded() || magazine.contents != 1 || player != GetMounted() || !CanFire() || player.InSafeZone())
		{
			return;
		}
		ItemDefinition ammoType = magazine.ammoType;
		if (ammoType == null)
		{
			AntiHack.Log(player, AntiHackType.ProjectileHack, "Item not found (" + base.ShortPrefabName + ")");
			player.stats.combat.LogInvalid(player, null, "item_missing");
			return;
		}
		ItemModProjectile component = ammoType.GetComponent<ItemModProjectile>();
		if (component == null)
		{
			AntiHack.Log(player, AntiHackType.ProjectileHack, "Item mod not found (" + base.ShortPrefabName + ")");
			player.stats.combat.LogInvalid(player, null, "mod_missing");
			return;
		}
		ProtoBuf.ProjectileShoot projectileShoot = ProtoBuf.ProjectileShoot.Deserialize(msg.read);
		if (projectileShoot.projectiles.Count != 1)
		{
			AntiHack.Log(player, AntiHackType.ProjectileHack, "Projectile count mismatch (" + base.ShortPrefabName + ")");
			player.stats.combat.LogInvalid(player, null, "count_mismatch");
			return;
		}
		player.CleanupExpiredProjectiles();
		System.Guid projectileGroupId = System.Guid.NewGuid();
		foreach (ProtoBuf.ProjectileShoot.Projectile projectile in projectileShoot.projectiles)
		{
			if (player.HasFiredProjectile(projectile.projectileID))
			{
				AntiHack.Log(player, AntiHackType.ProjectileHack, "Duplicate ID (" + projectile.projectileID + ")");
				player.stats.combat.LogInvalid(player, null, "duplicate_id");
			}
			else if (ValidateFirePos(player, projectile.startPos))
			{
				player.NoteFiredProjectile(projectile.projectileID, projectile.startPos, projectile.startVel, null, ammoType, projectileGroupId, UnityEngine.Vector3.zero);
				Effect effect = new Effect();
				effect.Init(Effect.Type.Projectile, projectile.startPos, projectile.startVel, msg.connection);
				effect.scale = 1f;
				effect.pooledString = component.projectileObject.resourcePath;
				effect.number = projectile.seed;
				EffectNetwork.Send(effect);
			}
		}
		projectileShoot?.Dispose();
		SendAimDirImmediate(force: true);
		player.MarkHostileFor();
		SignalBroadcast(BaseEntity.Signal.Attack, string.Empty, msg.connection);
		magazine.contents = 0;
		reloadProgress = 0f;
		SetFlag(BaseEntity.Flags.Reserved5, b: false);
		if (HasOwner())
		{
			ballistaOwner.RefreshLastUseTime();
			ballistaOwner.OnFired();
		}
		SingletonComponent<NpcNoiseManager>.Instance.OnWeaponShot(player, null);
	}
}

```
