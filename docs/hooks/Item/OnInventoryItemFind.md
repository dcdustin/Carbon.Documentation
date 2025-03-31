# OnInventoryItemFind
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when searching a player's inventory for an item by name or ID.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private Item OnInventoryItemFind(PlayerInventory playerInventory)
{
	Puts("OnInventoryItemFind has been fired!");
	return (Item)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerInventory]
public Item FindItemByItemID(string itemName)
{
	ItemDefinition itemDefinition = ItemManager.FindItemDefinition(itemName);
	if (itemDefinition == null)
	{
		return null;
	}
	return FindItemByItemID(itemDefinition.itemid);
}

```
:::
