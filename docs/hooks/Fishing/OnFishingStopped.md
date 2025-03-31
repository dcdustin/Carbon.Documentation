# OnFishingStopped
<Badge type="info" text="Fishing"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a fishing attempt is stopped or canceled.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnFishingStopped(BaseFishingRod baseFishingRod, BaseFishingRod.FailReason reason)
{
	Puts("OnFishingStopped has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseFishingRod]
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
:::
