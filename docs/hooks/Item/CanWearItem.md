# CanWearItem
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Determines if a player can wear a given clothing or armor item.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanWearItem(PlayerInventory playerInventory)
{
	Puts("CanWearItem has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerInventory]
public bool CanWearItem(Item item, int targetSlot)
{
	return CanWearItem(item, canAdjustClothing: true, targetSlot);
}

```
:::
