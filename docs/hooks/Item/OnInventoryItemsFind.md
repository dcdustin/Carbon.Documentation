# OnInventoryItemsFind
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when searching an inventory for all items of a certain type.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private System.Collections.Generic.List`1[[Item, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]] OnInventoryItemsFind()
{
	Puts("OnInventoryItemsFind has been fired!");
	return (System.Collections.Generic.List<Item>)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerInventory]
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
:::
