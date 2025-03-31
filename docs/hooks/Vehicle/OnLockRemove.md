# OnLockRemove
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnLockRemove(ModularCarGarage modularCarGarage, BasePlayer player)
{
	Puts("OnLockRemove has been fired!");
	return (object)default;
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
