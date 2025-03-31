<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnElevatorButtonPress
Called when a player presses an elevator’s up/down button to raise or lower the elevator.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnElevatorButtonPress()
{
	Puts("OnElevatorButtonPress has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ElevatorLift]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void Server_RaiseLowerFloor(BaseEntity.RPCMessage msg)
{
	Elevator.Direction direction = (Elevator.Direction)msg.read.Int32();
	bool flag = msg.read.Bit();
	SetFlag((direction == Elevator.Direction.Up) ? BaseEntity.Flags.Reserved1 : BaseEntity.Flags.Reserved2, b: true);
	SetFlag(BaseEntity.Flags.Reserved6, flag);
	owner.Server_RaiseLowerElevator(direction, flag);
	Invoke(ClearDirection, 0.7f);
	if (liftButtonPressedEffect.isValid)
	{
		Effect.server.Run(liftButtonPressedEffect.resourcePath, base.transform.position, UnityEngine.Vector3.up);
	}
}

```
:::
