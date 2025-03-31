# CanLockerAcceptItem
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Determines if a given item can be stored in a locker.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanLockerAcceptItem(Locker locker)
{
	Puts("CanLockerAcceptItem has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ Locker]
public override bool ItemFilter(Item item, int targetSlot)
{
	if (!base.ItemFilter(item, targetSlot))
	{
		return false;
	}
	bool num = item.IsBackpack();
	bool flag = IsBackpackSlot(targetSlot);
	if (num != flag)
	{
		return false;
	}
	if (isTransferringIndustrialItem && GetRowType(targetSlot) == Locker.RowType.Belt && item.info.category == ItemCategory.Attire)
	{
		return false;
	}
	if (item.info.category == ItemCategory.Attire)
	{
		return true;
	}
	return GetRowType(targetSlot) == Locker.RowType.Belt;
}

```
:::
