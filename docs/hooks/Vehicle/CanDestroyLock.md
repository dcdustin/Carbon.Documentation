<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanDestroyLock
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanDestroyLock()
{
	Puts("CanDestroyLock has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ ModularCar]
public bool PlayerCanDestroyLock(BasePlayer player, BaseVehicleModule viaModule)
{
	return CarLock.PlayerCanDestroyLock(viaModule);
}

```
:::
