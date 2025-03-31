<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnWeaponReload
```csharp
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
