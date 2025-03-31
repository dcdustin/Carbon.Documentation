<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnVehicleLockableCheck
```csharp
public bool CanHaveALock()
{
	if (!owner.IsDead())
	{
		return owner.HasDriverMountPoints();
	}
	return false;
}

```
