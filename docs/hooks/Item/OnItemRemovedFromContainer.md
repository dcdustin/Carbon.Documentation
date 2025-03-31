# OnItemRemovedFromContainer
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an item is removed from a container (inventory).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemRemovedFromContainer(ItemContainer itemContainer)
{
	Puts("OnItemRemovedFromContainer has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ItemContainer]
public bool Remove(Item item)
{
	if (!itemList.Contains(item))
	{
		return false;
	}
	onPreItemRemove?.Invoke(item);
	itemList.Remove(item);
	item.parent = null;
	onItemParentChanged?.Invoke(parent, item);
	onItemAddedRemoved?.Invoke(item, arg2: false);
	ItemContainer itemContainer = parent?.parent;
	if (itemContainer != null && itemContainer.onItemContentsChanged != null)
	{
		itemContainer.onItemContentsChanged(item, arg2: false);
	}
	MarkDirty();
	return true;
}

```
:::
