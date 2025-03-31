# OnItemStacked
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when two item stacks are combined into one stack.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemStacked(Item local21, Item item, ItemContainer newcontainer)
{
	Puts("OnItemStacked has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Item]
public bool MoveToContainer(ItemContainer newcontainer, int iTargetPos = -1, bool allowStack = true, bool ignoreStackLimit = false, BasePlayer sourcePlayer = null, bool allowSwap = true)
{
	using (TimeWarning.New("MoveToContainer"))
	{
		bool flag = iTargetPos == -1;
		ItemContainer itemContainer = parent;
		if (iTargetPos == -1)
		{
			if (allowStack && info.stackable > 1)
			{
				foreach (Item item3 in System.Linq.Enumerable.OrderBy(newcontainer.FindItemsByItemID(info.itemid), (Item x) => x.position))
				{
					if (item3.CanStack(this) && (ignoreStackLimit || item3.amount < item3.MaxStackable()))
					{
						iTargetPos = item3.position;
					}
				}
			}
			if (iTargetPos == -1 && newcontainer.GetEntityOwner(returnHeldEntity: true) is IIdealSlotEntity idealSlotEntity)
			{
				iTargetPos = idealSlotEntity.GetIdealSlot(sourcePlayer, newcontainer, this);
				if (iTargetPos == int.MinValue)
				{
					return false;
				}
			}
			if (iTargetPos == -1)
			{
				if (newcontainer == parent)
				{
					return false;
				}
				bool flag2 = newcontainer.HasFlag(ItemContainer.Flag.Clothing) && info.isWearable;
				ItemModWearable itemModWearable = info.ItemModWearable;
				for (int i = 0; i < newcontainer.capacity; i++)
				{
					Item slot = newcontainer.GetSlot(i);
					if (slot == null)
					{
						if (CanMoveTo(newcontainer, i))
						{
							iTargetPos = i;
							break;
						}
						continue;
					}
					if (flag2 && slot != null && !slot.info.ItemModWearable.CanExistWith(itemModWearable))
					{
						iTargetPos = i;
						break;
					}
					if (newcontainer.HasAvailableSlotsDefined && DoItemSlotsConflict(slot))
					{
						iTargetPos = i;
						break;
					}
				}
				if (flag2 && iTargetPos == -1)
				{
					iTargetPos = newcontainer.capacity - 1;
				}
			}
		}
		if (iTargetPos == -1)
		{
			return false;
		}
		if (!CanMoveTo(newcontainer, iTargetPos))
		{
			return false;
		}
		if (iTargetPos >= 0 && newcontainer.SlotTaken(this, iTargetPos))
		{
			Item slot2 = newcontainer.GetSlot(iTargetPos);
			if (slot2 == this)
			{
				return false;
			}
			if (allowStack && slot2 != null)
			{
				int num = slot2.MaxStackable();
				if (slot2.CanStack(this))
				{
					if (ignoreStackLimit)
					{
						num = int.MaxValue;
					}
					if (slot2.amount >= num)
					{
						return false;
					}
					int num2 = UnityEngine.Mathf.Min(num - slot2.amount, amount);
					slot2.amount += num2;
					if (slot2.instanceData != null && instanceData != null && (bool)info.GetComponent<ItemModFoodSpoiling>())
					{
						slot2.instanceData.dataFloat = UnityEngine.Mathf.Min(slot2.instanceData.dataFloat, instanceData.dataFloat);
					}
					newcontainer.onItemAddedToStack?.Invoke(slot2, num2);
					amount -= num2;
					slot2.MarkDirty();
					MarkDirty();
					MigrateItemOwnership(slot2, num2);
					if (amount <= 0)
					{
						RemoveFromWorld();
						RemoveFromContainer();
						Remove();
						return true;
					}
					if (flag)
					{
						return MoveToContainer(newcontainer, -1, allowStack, ignoreStackLimit, sourcePlayer);
					}
					return false;
				}
			}
			if (parent != null && allowSwap && slot2 != null)
			{
				ItemContainer itemContainer2 = parent;
				int iTargetPos2 = position;
				ItemContainer newcontainer2 = slot2.parent;
				int num3 = slot2.position;
				if (!slot2.CanMoveTo(itemContainer2, iTargetPos2))
				{
					return false;
				}
				if (itemContainer2.maxStackSize > 0 && slot2.amount > itemContainer2.maxStackSize)
				{
					Item item = slot2.SplitItem(slot2.amount - itemContainer2.maxStackSize);
					if (item == null || !item.MoveToContainer(newcontainer2, -1, allowStack: false, ignoreStackLimit: false, sourcePlayer, allowSwap: false))
					{
						slot2.amount += item.amount;
						item.MigrateItemOwnership(slot2, item.amount);
						item.Remove();
						return false;
					}
				}
				BaseEntity entityOwner = GetEntityOwner();
				BaseEntity entityOwner2 = slot2.GetEntityOwner();
				RemoveFromContainer();
				slot2.RemoveFromContainer();
				RemoveConflictingSlots(newcontainer, entityOwner, sourcePlayer);
				slot2.RemoveConflictingSlots(itemContainer2, entityOwner2, sourcePlayer);
				if (!slot2.MoveToContainer(itemContainer2, iTargetPos2, allowStack: true, ignoreStackLimit: false, sourcePlayer) || !MoveToContainer(newcontainer, iTargetPos, allowStack: true, ignoreStackLimit: false, sourcePlayer))
				{
					RemoveFromContainer();
					slot2.RemoveFromContainer();
					SetParent(itemContainer2);
					position = iTargetPos2;
					slot2.SetParent(newcontainer2);
					slot2.position = num3;
					return true;
				}
				return true;
			}
			return false;
		}
		if (parent == newcontainer)
		{
			if (iTargetPos >= 0 && iTargetPos != position && !parent.SlotTaken(this, iTargetPos))
			{
				newcontainer.onItemPositionChanged?.Invoke(this, position, iTargetPos);
				position = iTargetPos;
				MarkDirty();
				return true;
			}
			return false;
		}
		if (newcontainer.maxStackSize > 0 && newcontainer.maxStackSize < amount)
		{
			Item item2 = SplitItem(newcontainer.maxStackSize);
			if (item2 != null && !item2.MoveToContainer(newcontainer, iTargetPos, allowStack: false, ignoreStackLimit: false, sourcePlayer) && (itemContainer == null || !item2.MoveToContainer(itemContainer, -1, allowStack: true, ignoreStackLimit: false, sourcePlayer)))
			{
				DroppedItem droppedItem = item2.Drop(newcontainer.dropPosition, newcontainer.dropVelocity) as DroppedItem;
				if (droppedItem != null)
				{
					droppedItem.DroppedBy = sourcePlayer?.userID ?? ((EncryptedValue<ulong>)0uL);
				}
			}
			return true;
		}
		if (!newcontainer.CanAccept(this))
		{
			return false;
		}
		BaseEntity entityOwner3 = GetEntityOwner();
		RemoveFromContainer();
		RemoveFromWorld();
		RemoveConflictingSlots(newcontainer, entityOwner3, sourcePlayer);
		position = iTargetPos;
		SetParent(newcontainer);
		return true;
	}
}

```
:::
