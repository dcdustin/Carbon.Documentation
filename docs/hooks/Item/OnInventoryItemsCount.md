# OnInventoryItemsCount
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when counting the total amount of a specific item in an inventory.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private int OnInventoryItemsCount(PlayerInventory playerInventory)
{
	Puts("OnInventoryItemsCount has been fired!");
	return (int)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerInventory]
public int GetAmount(ItemDefinition definition)
{
	if (!(definition != null))
	{
		return 0;
	}
	return GetAmount(definition.itemid);
}

```
:::
