# OnVehicleModuleMove
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnVehicleModuleMove(BaseVehicleModule local0, BaseModularVehicle baseModularVehicle, BasePlayer player)
{
	Puts("OnVehicleModuleMove has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseModularVehicle]
public bool CanMoveFrom(BasePlayer player, Item item)
{
	BaseVehicleModule moduleForItem = GetModuleForItem(item);
	if (moduleForItem != null)
	{
		return moduleForItem.CanBeMovedNow();
	}
	return true;
}

```
:::
