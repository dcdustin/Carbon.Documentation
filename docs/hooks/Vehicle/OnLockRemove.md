<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLockRemove
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnLockRemove()
{
	Puts("OnLockRemove has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ModularCarGarage]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_RequestRemoveLock(BaseEntity.RPCMessage msg)
{
	if (HasOccupant && carOccupant.CarLock.HasALock)
	{
		carOccupant.CarLock.RemoveLock();
		Effect.server.Run(addRemoveLockEffect.resourcePath, this, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
	}
}

```
:::
