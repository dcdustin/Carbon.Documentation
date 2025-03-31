<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLiftUse
Called when a player uses an elevator lift (activates the lift to move).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnLiftUse()
{
	Puts("OnLiftUse has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ProceduralLift]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_UseLift(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && !IsBusy())
	{
		MoveToFloor((floorIndex + 1) % stops.Length);
	}
}

```
:::
