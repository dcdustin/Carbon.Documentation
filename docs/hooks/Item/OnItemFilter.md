# OnItemFilter
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when checking an item against a storage container's filter.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnItemFilter()
{
	Puts("OnItemFilter has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ StorageContainer]
public virtual bool ItemFilter(Item item, int targetSlot)
{
	if (onlyAcceptCategory == ItemCategory.All)
	{
		return true;
	}
	return item.info.category == onlyAcceptCategory;
}

```
:::
