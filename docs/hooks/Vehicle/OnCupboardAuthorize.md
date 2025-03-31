<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCupboardAuthorize [VehiclePrivilege]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void AddSelfAuthorize(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && IsDriver(rpc.player))
	{
		AddPlayer(rpc.player);
		SendNetworkUpdate();
	}
}

```
