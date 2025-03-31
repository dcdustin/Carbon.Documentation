# OnElevatorMove
<Badge type="info" text="Elevator"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an elevator lift begins moving to a target floor as requested.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnElevatorMove()
{
	Puts("OnElevatorMove has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ Elevator]
public bool RequestMoveLiftTo(int targetFloor, out float timeToTravel, Elevator fromElevator)
{
	timeToTravel = 0f;
	if (IsBusy())
	{
		return false;
	}
	if (!IsStatic && ioEntity != null && !ioEntity.IsPowered())
	{
		return false;
	}
	if (!IsValidFloor(targetFloor))
	{
		return false;
	}
	int num = LiftPositionToFloor();
	if (num == targetFloor)
	{
		OpenDoorsAtFloor(num);
		return false;
	}
	if (!liftEntity.IsValid(base.isServer))
	{
		return false;
	}
	ElevatorLift elevatorLift = liftEntity.Get(base.isServer);
	if (!elevatorLift.CanMove())
	{
		return false;
	}
	UnityEngine.Vector3 worldSpaceFloorPosition = GetWorldSpaceFloorPosition(targetFloor);
	if (!GamePhysics.LineOfSight(elevatorLift.transform.position, worldSpaceFloorPosition, 2097152))
	{
		return false;
	}
	OnMoveBegin();
	timeToTravel = TimeToTravelDistance(UnityEngine.Mathf.Abs(elevatorLift.transform.position.y - worldSpaceFloorPosition.y));
	LeanTween.moveY(elevatorLift.gameObject, worldSpaceFloorPosition.y, timeToTravel).delay = LiftMoveDelay;
	timeToTravel += LiftMoveDelay;
	SetFlag(BaseEntity.Flags.Busy, b: true);
	if (targetFloor < Floor)
	{
		elevatorLift.ToggleHurtTrigger(state: true);
	}
	elevatorLift.SetFlag(BaseEntity.Flags.Busy, b: true);
	Invoke(ClearBusy, timeToTravel + 1f);
	elevatorLift.NotifyNewFloor(targetFloor, Floor);
	EntityLinkBroadcast(delegate(Elevator elevatorEnt)
	{
		elevatorEnt.SetFlag(BaseEntity.Flags.Busy, b: true);
	}, (ConstructionSocket socket) => socket.socketType == ConstructionSocket.Type.Elevator);
	if (ioEntity != null)
	{
		ioEntity.SetFlag(BaseEntity.Flags.Busy, b: true);
		ioEntity.SendChangedToRoot(forceUpdate: true);
	}
	return true;
}

```
:::
