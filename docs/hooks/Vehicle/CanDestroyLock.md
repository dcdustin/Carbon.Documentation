# CanDestroyLock
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanDestroyLock(BasePlayer player, ModularCar modularCar, BaseVehicleModule viaModule)
{
	Puts("CanDestroyLock has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ ModularCar]
public bool PlayerCanDestroyLock(BasePlayer player, BaseVehicleModule viaModule)
{
	return CarLock.PlayerCanDestroyLock(viaModule);
}

```
:::
