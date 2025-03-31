<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInventoryItemFind
```csharp
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
