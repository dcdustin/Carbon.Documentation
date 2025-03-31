<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCupboardClearList
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void ClearList(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && CanAdministrate(rpc.player))
	{
		authorizedPlayers.Clear();
		UpdateMaxAuthCapacity();
		SendNetworkUpdate();
	}
}

```
