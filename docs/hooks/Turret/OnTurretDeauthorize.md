<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTurretDeauthorize
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RemoveSelfAuthorize(BaseEntity.RPCMessage rpc)
{
	if (!booting && !IsOnline() && IsAuthed(rpc.player))
	{
		authorizedPlayers.RemoveWhere((ProtoBuf.PlayerNameID x) => x.userid == (ulong)rpc.player.userID);
		authDirty = true;
		Facepunch.Rust.Analytics.Azure.OnEntityAuthChanged(this, rpc.player, System.Linq.Enumerable.Select(authorizedPlayers, (ProtoBuf.PlayerNameID x) => x.userid), "removed", rpc.player.userID);
		UpdateMaxAuthCapacity();
		SendNetworkUpdate();
	}
}

```
