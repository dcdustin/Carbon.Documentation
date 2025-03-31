# CanElevatorLiftMove
<Badge type="info" text="Elevator"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Triggered when an elevator lift is about to move. Plugins can allow or block the movement (e.g., based on what's on the lift).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanElevatorLiftMove(ElevatorLift elevatorLift)
{
	Puts("CanElevatorLiftMove has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ ElevatorLift]
public bool CanMove()
{
	if (VehicleTrigger.HasContents && VehicleTrigger.entityContents != null)
	{
		foreach (BaseEntity entityContent in VehicleTrigger.entityContents)
		{
			if (!vehiclePrefabWhitelist.Contains(entityContent.prefabID))
			{
				return false;
			}
		}
	}
	return true;
}

```
:::
