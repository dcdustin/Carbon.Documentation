<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemRemovedFromContainer
```csharp
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
