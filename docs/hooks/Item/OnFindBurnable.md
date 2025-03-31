<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFindBurnable
```csharp
public Item FindBurnable()
{
	if (base.inventory == null)
	{
		return null;
	}
	foreach (Item item in base.inventory.itemList)
	{
		if (IsBurnableItem(item))
		{
			return item;
		}
	}
	return null;
}

```
