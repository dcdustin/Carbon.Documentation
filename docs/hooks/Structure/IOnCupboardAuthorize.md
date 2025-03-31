<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnCupboardAuthorize [BuildingPrivlidge]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void AddAuthorize(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && CanAdministrate(rpc.player))
	{
		ulong targetPlayerId = rpc.read.UInt64();
		AddPlayer(rpc.player, targetPlayerId);
		SendNetworkUpdate();
	}
}

```
