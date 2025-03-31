<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanElevatorLiftMove
Triggered when an elevator lift is about to move. Plugins can allow or block the movement (e.g., based on what's on the lift).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanElevatorLiftMove()
{
	Puts("CanElevatorLiftMove has been fired!");
	return (System.Boolean)default;
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
