# OnEngineLoadoutRefresh
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEngineLoadoutRefresh()
{
	Puts("OnEngineLoadoutRefresh has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ Rust.Modular.EngineStorage]
public void RefreshLoadoutData()
{
	isUsable = base.inventory.IsFull() && System.Linq.Enumerable.All(base.inventory.itemList, (Item item) => !item.isBroken);
	accelerationBoostPercent = GetContainerItemsValueFor(Rust.Modular.EngineItemTypeEx.BoostsAcceleration) / (float)accelerationBoostSlots;
	topSpeedBoostPercent = GetContainerItemsValueFor(Rust.Modular.EngineItemTypeEx.BoostsTopSpeed) / (float)topSpeedBoostSlots;
	fuelEconomyBoostPercent = GetContainerItemsValueFor(Rust.Modular.EngineItemTypeEx.BoostsFuelEconomy) / (float)fuelEconomyBoostSlots;
	SendNetworkUpdate();
	GetEngineModule()?.RefreshPerformanceStats(this);
}

```
:::
