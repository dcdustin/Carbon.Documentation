<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInventoryItemsFind
```csharp
public System.Collections.Generic.List<Item> FindItemsByItemID(int id)
{
	System.Collections.Generic.List<Item> list = new System.Collections.Generic.List<Item>();
	if (containerMain != null)
	{
		list.AddRange(containerMain.FindItemsByItemID(id));
	}
	if (containerBelt != null)
	{
		list.AddRange(containerBelt.FindItemsByItemID(id));
	}
	if (containerWear != null)
	{
		list.AddRange(containerWear.FindItemsByItemID(id));
	}
	return list;
}

```
