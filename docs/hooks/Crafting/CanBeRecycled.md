# CanBeRecycled
<Badge type="info" text="Crafting"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when checking if an item is eligible to be recycled. Plugins can override to allow or block recycling of the item.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanBeRecycled(Item item, Recycler recycler)
{
	Puts("CanBeRecycled has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ Recycler]
public bool CanBeRecycled(Item item)
{
	if (item != null)
	{
		return item.info.Blueprint != null;
	}
	return false;
}

```
:::
