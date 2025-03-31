<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerKeepAlive
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_KeepAlive(BaseEntity.RPCMessage msg)
{
	if (msg.player.CanInteract() && !(msg.player == this) && IsWounded())
	{
		ProlongWounding(10f);
	}
}

```
