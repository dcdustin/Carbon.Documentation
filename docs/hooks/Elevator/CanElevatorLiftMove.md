<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanElevatorLiftMove
```csharp
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
