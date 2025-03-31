<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInventoryItemsCount
```csharp
public int GetAmount(ItemDefinition definition)
{
	if (!(definition != null))
	{
		return 0;
	}
	return GetAmount(definition.itemid);
}

```
