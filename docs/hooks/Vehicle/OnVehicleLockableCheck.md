<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnVehicleLockableCheck
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnVehicleLockableCheck()
{
	Puts("OnVehicleLockableCheck has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ ModularCarCodeLock]
public bool CanHaveALock()
{
	if (!owner.IsDead())
	{
		return owner.HasDriverMountPoints();
	}
	return false;
}

```
:::
