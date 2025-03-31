<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTurretClearList
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void ClearList(BaseEntity.RPCMessage rpc)
{
	if (!booting && !IsOnline() && IsAuthed(rpc.player))
	{
		authorizedPlayers.Clear();
		authDirty = true;
		Facepunch.Rust.Analytics.Azure.OnEntityAuthChanged(this, rpc.player, System.Linq.Enumerable.Select(authorizedPlayers, (ProtoBuf.PlayerNameID x) => x.userid), "clear", rpc.player.userID);
		UpdateMaxAuthCapacity();
		SendNetworkUpdate();
	}
}

```
