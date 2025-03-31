<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCupboardClearList [VehiclePrivilege]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void ClearList(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && IsDriver(rpc.player))
	{
		authorizedPlayers.Clear();
		UpdateMaxAuthCapacity();
		SendNetworkUpdate();
	}
}

```
