# OnInventoryItemFind
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when searching a player's inventory for an item by name or ID.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private Item OnInventoryItemFind()
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
