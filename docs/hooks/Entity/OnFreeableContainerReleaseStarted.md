<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFreeableContainerReleaseStarted
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_FreeCrateTimer(BaseEntity.RPCMessage msg)
{
	if (IsTiedDown())
	{
		startUntieTime = UnityEngine.Time.realtimeSinceStartup;
	}
}

```
