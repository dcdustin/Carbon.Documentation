<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEngineLoadoutRefresh
```csharp
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
