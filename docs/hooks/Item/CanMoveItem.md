<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanMoveItem
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
public void MoveItem(BaseEntity.RPCMessage msg)
{
	if (base.baseEntity.IsTransferring())
	{
		return;
	}
	ItemId id = msg.read.ItemID();
	ItemContainerId itemContainerId = msg.read.ItemContainerID();
	int num = msg.read.Int8();
	int num2 = (int)msg.read.UInt32();
	ItemMoveModifier itemMoveModifier = (ItemMoveModifier)msg.read.Int32();
	Item item = FindItemByUID(id);
	if (item == null)
	{
		msg.player.ShowToast(GameTip.Styles.Error, PlayerInventoryErrors.InvalidItem, false);
		ConstructionErrors.Log(msg.player, id.ToString());
		return;
	}
	BaseEntity entityOwner = item.GetEntityOwner();
	if (entityOwner != null && entityOwner == msg.player && msg.player.IsRestrainedOrSurrendering)
	{
		return;
	}
	if (!CanMoveItemsFrom(entityOwner, item))
	{
		msg.player.ShowToast(GameTip.Styles.Error, PlayerInventoryErrors.CannotMoveItem, true);
		return;
	}
	if (num2 <= 0)
	{
		num2 = item.amount;
	}
	num2 = UnityEngine.Mathf.Clamp(num2, 1, item.MaxStackable());
	if (msg.player.GetActiveItem() == item)
	{
		msg.player.UpdateActiveItem(default(ItemId));
	}
	if (!itemContainerId.IsValid)
	{
		BaseEntity baseEntity = entityOwner;
		if (loot.containers.Count > 0)
		{
			if (entityOwner == base.baseEntity)
			{
				if (!itemMoveModifier.HasFlag(ItemMoveModifier.Alt))
				{
					baseEntity = loot.entitySource;
				}
			}
			else
			{
				baseEntity = base.baseEntity;
			}
		}
		if (baseEntity is IIdealSlotEntity idealSlotEntity)
		{
			itemContainerId = idealSlotEntity.GetIdealContainer(base.baseEntity, item, itemMoveModifier);
			if (itemContainerId == ItemContainerId.Invalid)
			{
				return;
			}
		}
		ItemContainer parent = item.parent;
		if (parent != null && parent.IsLocked())
		{
			msg.player.ShowToast(GameTip.Styles.Error, PlayerInventoryErrors.ContainerLocked, false);
			return;
		}
		if (!itemContainerId.IsValid)
		{
			if (baseEntity == loot.entitySource)
			{
				foreach (ItemContainer container in loot.containers)
				{
					if (!container.PlayerItemInputBlocked() && !container.IsLocked() && item.MoveToContainer(container, -1, allowStack: true, ignoreStackLimit: false, base.baseEntity))
					{
						break;
					}
				}
				return;
			}
			if (!GiveItem(item, itemMoveModifier))
			{
				msg.player.ShowToast(GameTip.Styles.Error, "GiveItem failed!", false);
			}
			return;
		}
	}
	ItemContainer itemContainer = FindContainer(itemContainerId);
	if (itemContainer == null)
	{
		msg.player.ShowToast(GameTip.Styles.Error, PlayerInventoryErrors.InvalidContainer, false);
		ConstructionErrors.Log(msg.player, itemContainerId.ToString());
		return;
	}
	if (itemContainer.IsLocked())
	{
		msg.player.ShowToast(GameTip.Styles.Error, PlayerInventoryErrors.ContainerLocked, false);
		return;
	}
	if (itemContainer.PlayerItemInputBlocked())
	{
		msg.player.ShowToast(GameTip.Styles.Error, PlayerInventoryErrors.DoesntAcceptPlayerItems, false);
		return;
	}
	if (itemContainer.maxStackSize > 0)
	{
		num2 = UnityEngine.Mathf.Clamp(num2, 1, itemContainer.maxStackSize);
	}
	using (TimeWarning.New("Split"))
	{
		if (item.amount > num2)
		{
			int split_Amount = num2;
			Item item2 = item.SplitItem(split_Amount);
			Item slot = itemContainer.GetSlot(num);
			if (slot != null && !item.CanStack(slot) && item.parent != null && !item2.MoveToContainer(item.parent, -1, allowStack: false, ignoreStackLimit: false, base.baseEntity, allowSwap: false))
			{
				item.amount += item2.amount;
				item2.Remove();
				ItemManager.DoRemoves();
				ServerUpdate(0f);
				return;
			}
			if (!item2.MoveToContainer(itemContainer, num, allowStack: true, ignoreStackLimit: false, base.baseEntity))
			{
				item.amount += item2.amount;
				item2.Remove();
			}
			else
			{
				item.parent.onItemRemovedFromStack?.Invoke(item, num2);
			}
			ItemManager.DoRemoves();
			ServerUpdate(0f);
			return;
		}
	}
	if (item.MoveToContainer(itemContainer, num, allowStack: true, ignoreStackLimit: false, base.baseEntity))
	{
		ItemManager.DoRemoves();
		ServerUpdate(0f);
	}
}

```
