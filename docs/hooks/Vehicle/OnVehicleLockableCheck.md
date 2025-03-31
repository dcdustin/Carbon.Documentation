# OnVehicleLockableCheck
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnVehicleLockableCheck(ModularCarCodeLock modularCarCodeLock)
{
	Puts("OnVehicleLockableCheck has been fired!");
	return (bool)default;
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
