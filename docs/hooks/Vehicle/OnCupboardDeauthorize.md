<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCupboardDeauthorize [VehiclePrivilege]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RemoveSelfAuthorize(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && IsDriver(rpc.player))
	{
		authorizedPlayers.RemoveAll((ProtoBuf.PlayerNameID x) => x.userid == (ulong)rpc.player.userID);
		Facepunch.Rust.Analytics.Azure.OnEntityAuthChanged(this, rpc.player, System.Linq.Enumerable.Select(authorizedPlayers, (ProtoBuf.PlayerNameID x) => x.userid), "removed", rpc.player.userID);
		UpdateMaxAuthCapacity();
		SendNetworkUpdate();
	}
}

```
