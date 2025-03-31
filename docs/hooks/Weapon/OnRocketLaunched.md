# OnRocketLaunched
<Badge type="info" text="Weapon"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnRocketLaunched()
{
	Puts("OnRocketLaunched has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseLauncher]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void SV_Launch(BaseEntity.RPCMessage msg)
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
	if (!base.UsingInfiniteAmmoCheat)
	{
		if (primaryMagazine.contents <= 0)
		{
			AntiHack.Log(player, AntiHackType.ProjectileHack, "Magazine empty (" + base.ShortPrefabName + ")");
			player.stats.combat.LogInvalid(player, this, "magazine_empty");
			return;
		}
		ModifyAmmoCount(-1);
	}
	SignalBroadcast(BaseEntity.Signal.Attack, string.Empty, player.net.connection);
	UnityEngine.Vector3 vector = msg.read.Vector3();
	UnityEngine.Vector3 vector2 = msg.read.Vector3().normalized;
	bool num = msg.read.Bit();
	BaseEntity mounted = player.GetParentEntity();
	if (mounted == null)
	{
		mounted = player.GetMounted();
	}
	if (num)
	{
		if (mounted != null)
		{
			vector = mounted.transform.TransformPoint(vector);
			vector2 = mounted.transform.TransformDirection(vector2);
		}
		else
		{
			vector = player.eyes.position;
			vector2 = player.eyes.BodyForward();
		}
	}
	if (!ValidateEyePos(player, vector))
	{
		return;
	}
	ItemModProjectile component = primaryMagazine.ammoType.GetComponent<ItemModProjectile>();
	if (!component)
	{
		AntiHack.Log(player, AntiHackType.ProjectileHack, "Item mod not found (" + base.ShortPrefabName + ")");
		player.stats.combat.LogInvalid(player, this, "mod_missing");
		return;
	}
	float num2 = GetAimCone() + component.projectileSpread;
	if (num2 > 0f)
	{
		vector2 = AimConeUtil.GetModifiedAimConeDirection(num2, vector2);
	}
	float num3 = 1f;
	if (UnityEngine.Physics.Raycast(vector, vector2, out var hitInfo, num3, 1237003025))
	{
		num3 = hitInfo.distance - 0.1f;
	}
	BaseEntity baseEntity = GameManager.server.CreateEntity(component.projectileObject.resourcePath, vector + vector2 * num3);
	if (baseEntity == null)
	{
		return;
	}
	baseEntity.creatorEntity = player;
	ServerProjectile component2 = baseEntity.GetComponent<ServerProjectile>();
	if ((bool)component2)
	{
		component2.InitializeVelocity(GetInheritedVelocity(player, vector2) + vector2 * component2.speed * initialSpeedMultiplier);
	}
	baseEntity.Spawn();
	ProjectileLaunched_Server(component2);
	Facepunch.Rust.Analytics.Azure.OnExplosiveLaunched(player, baseEntity, this);
	StartAttackCooldown(ScaleRepeatDelay(repeatDelay));
	Item ownerItem = GetOwnerItem();
	if (ownerItem != null)
	{
		if (!base.UsingInfiniteAmmoCheat)
		{
			ownerItem.LoseCondition(UnityEngine.Random.Range(1f, 2f));
		}
		BaseMountable mounted2 = player.GetMounted();
		if (mounted2 != null)
		{
			mounted2.OnWeaponFired(this);
		}
	}
}

```
:::
