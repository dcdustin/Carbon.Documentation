<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemFilter
```csharp
public virtual bool ItemFilter(Item item, int targetSlot)
{
	if (onlyAcceptCategory == ItemCategory.All)
	{
		return true;
	}
	return item.info.category == onlyAcceptCategory;
}

```
