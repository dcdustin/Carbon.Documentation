# OnWeaponReload
<Badge type="info" text="Weapon"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a weapon starts reloading.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnWeaponReload(BaseProjectile baseProjectile, BasePlayer local0)
{
	Puts("OnWeaponReload has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseProjectile]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void StartReload(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!VerifyClientRPC(player))
	{
		SendNetworkUpdate();
		reloadStarted = false;
		reloadFinished = false;
		return;
	}
	reloadFinished = false;
	reloadStarted = true;
	fractionalInsertCounter = 0;
	if (CanRefundAmmo)
	{
		SwitchAmmoTypesIfNeeded(player.inventory);
	}
	OnReloadStarted();
	StartReloadCooldown(GetReloadDuration());
}

```
:::
