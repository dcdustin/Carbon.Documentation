# OnFuelConsumed
<Badge type="info" text="Fuel"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a fuel-burning entity has consumed fuel.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnFuelConsumed(BaseOven baseOven)
{
	Puts("OnFuelConsumed has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseOven]
public void ConsumeFuel(Item fuel, ItemModBurnable burnable)
{
	if (allowByproductCreation && burnable.byproductItem != null && UnityEngine.Random.Range(0f, 1f) > burnable.byproductChance)
	{
		Item item = ItemManager.Create(burnable.byproductItem, burnable.byproductAmount * GetCharcoalRate(), 0uL);
		if (!item.MoveToContainer(base.inventory))
		{
			OvenFull();
			item.Drop(base.inventory.dropPosition, base.inventory.dropVelocity);
		}
	}
	if (fuel.amount <= GetFuelRate())
	{
		fuel.Remove();
		return;
	}
	int fuelRate = GetFuelRate();
	fuel.UseItem(fuelRate);
	Facepunch.Rust.Analytics.Azure.AddPendingItems(this, fuel.info.shortname, fuelRate, "smelt");
	fuel.fuel = burnable.fuelAmount;
	fuel.MarkDirty();
}

```
:::
