<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnElevatorCall
Called when an elevator is called to a floor (e.g., player presses a call button at an elevator stop).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnElevatorCall()
{
	Puts("OnElevatorCall has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ Elevator]
[System.Runtime.CompilerServices.CompilerGenerated]
public void <CallElevator>b__26_0(Elevator elevatorEnt)
{
	if (elevatorEnt.IsTop)
	{
		elevatorEnt.RequestMoveLiftTo(Floor, out var _, this);
	}
}

```
:::
