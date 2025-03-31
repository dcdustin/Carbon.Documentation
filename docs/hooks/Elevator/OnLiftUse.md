<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLiftUse [ProceduralLift]
```csharp
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
