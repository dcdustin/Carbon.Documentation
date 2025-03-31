<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanAcceptItem
Determines if a container can accept a given item.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private ItemContainer.CanAcceptResult CanAcceptItem()
{
	Puts("CanAcceptItem has been fired!");
	return (ItemContainer.CanAcceptResult)default;
}
```
```csharp [Source — Assembly-CSharp @ ItemContainer]
public ItemContainer.CanAcceptResult CanAcceptItem(Item item, int targetPos)
{
	if (canAcceptItem != null && !canAcceptItem(item, targetPos))
	{
		return ItemContainer.CanAcceptResult.CannotAccept;
	}
	if (isServer && availableSlots != null && availableSlots.Count > 0)
	{
		if (item.info.occupySlots == (ItemSlot)0 || item.info.occupySlots == ItemSlot.None)
		{
			return ItemContainer.CanAcceptResult.CannotAccept;
		}
		if (item.isBroken)
		{
			return ItemContainer.CanAcceptResult.CannotAccept;
		}
		int num = 0;
		foreach (ItemSlot availableSlot in availableSlots)
		{
			num |= (int)availableSlot;
		}
		if (((uint)num & (uint)item.info.occupySlots) != (uint)item.info.occupySlots)
		{
			return ItemContainer.CanAcceptResult.CannotAcceptRightNow;
		}
	}
	if ((allowedContents & item.info.itemType) != item.info.itemType)
	{
		return ItemContainer.CanAcceptResult.CannotAccept;
	}
	if (HasLimitedAllowedItems)
	{
		bool flag = false;
		for (int i = 0; i < onlyAllowedItems.Length; i++)
		{
			if (onlyAllowedItems[i] == item.info)
			{
				flag = true;
				break;
			}
		}
		if (!flag)
		{
			return ItemContainer.CanAcceptResult.CannotAccept;
		}
	}
	if (blockedItems != null && blockedItems.Contains(item.info))
	{
		return ItemContainer.CanAcceptResult.CannotAccept;
	}
	if (item.GetItemVolume() > containerVolume)
	{
		return ItemContainer.CanAcceptResult.CannotAccept;
	}
	return ItemContainer.CanAcceptResult.CanAccept;
}

```
:::
