<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFishingStopped
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void Server_Cancel(BaseEntity.RPCMessage msg)
{
	if (CurrentState != BaseFishingRod.CatchState.Caught)
	{
		Server_Cancel(BaseFishingRod.FailReason.UserRequested);
	}
}

```
