<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCounterTargetChange
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void SERVER_SetTarget(BaseEntity.RPCMessage msg)
{
	if (CanPlayerAdmin(msg.player))
	{
		targetCounterNumber = msg.read.Int32();
		MarkDirty();
		SendNetworkUpdate();
	}
}

```
