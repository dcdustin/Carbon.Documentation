<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMeleeThrown
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
[BaseEntity.RPC_Server.IsActiveItem]
public void CLProject(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!VerifyClientAttack(player))
	{
		SendNetworkUpdate();
	}
	else
	{
		if (player == null || player.IsHeadUnderwater())
		{
			return;
		}
		if (!canThrowAsProjectile)
		{
			AntiHack.Log(player, AntiHackType.ProjectileHack, "Not throwable (" + base.ShortPrefabName + ")");
			player.stats.combat.LogInvalid(player, this, "not_throwable");
			return;
		}
		Item item = GetItem();
		if (item == null)
		{
			AntiHack.Log(player, AntiHackType.ProjectileHack, "Item not found (" + base.ShortPrefabName + ")");
			player.stats.combat.LogInvalid(player, this, "item_missing");
			return;
		}
		ItemModProjectile component = item.info.GetComponent<ItemModProjectile>();
		if (component == null)
		{
			AntiHack.Log(player, AntiHackType.ProjectileHack, "Item mod not found (" + base.ShortPrefabName + ")");
			player.stats.combat.LogInvalid(player, this, "mod_missing");
			return;
		}
		ProtoBuf.ProjectileShoot projectileShoot = ProtoBuf.ProjectileShoot.Deserialize(msg.read);
		if (projectileShoot.projectiles.Count != 1)
		{
			AntiHack.Log(player, AntiHackType.ProjectileHack, "Projectile count mismatch (" + base.ShortPrefabName + ")");
			player.stats.combat.LogInvalid(player, this, "count_mismatch");
			return;
		}
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
			Item pickupItem = (ThrowFullStack ? item : ItemManager.CreateByItemID(item.info.itemid, 1, 0uL));
			player.NoteFiredProjectile(projectile.projectileID, projectile.startPos, projectile.startVel, this, item.info, projectileGroupId, positionOffset, pickupItem);
			Effect effect = new Effect();
			effect.Init(Effect.Type.Projectile, projectile.startPos, projectile.startVel, msg.connection);
			effect.scale = 1f;
			effect.pooledString = component.projectileObject.resourcePath;
			effect.number = projectile.seed;
			EffectNetwork.Send(effect);
		}
		projectileShoot?.Dispose();
		if (ThrowFullStack)
		{
			item.SetParent(null);
		}
		else
		{
			item.UseItem();
			if (item.amount == 0)
			{
				item.SetParent(null);
			}
		}
		SingletonComponent<NpcNoiseManager>.Instance.OnWeaponThrown(player, this, canAiHearIt);
	}
}

```
