# OnItemAddedToContainer
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an item is added to a container (inventory).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemAddedToContainer(ItemContainer itemContainer)
{
	Puts("OnItemAddedToContainer has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ItemContainer]
public bool Insert(Item item)
{
	if (itemList.Contains(item))
	{
		return false;
	}
	if (IsFull())
	{
		return false;
	}
	itemList.Add(item);
	item.parent = this;
	if (!FindPosition(item))
	{
		return false;
	}
	MarkDirty();
	if (onItemAddedRemoved != null)
	{
		onItemAddedRemoved(item, arg2: true);
	}
	ItemContainer itemContainer = parent?.parent;
	if (itemContainer != null && itemContainer.onItemContentsChanged != null)
	{
		itemContainer.onItemContentsChanged(item, arg2: true);
	}
	return true;
}

```
:::
