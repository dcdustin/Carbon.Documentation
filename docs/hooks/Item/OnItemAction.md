# OnItemAction
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player performs an inventory item action (uses or interacts with an item).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemAction()
{
	Puts("OnItemAction has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerInventory]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
public void ItemCmd(BaseEntity.RPCMessage msg)
{
	if ((msg.player != null && msg.player.IsWounded()) || base.baseEntity.IsTransferring())
	{
		return;
	}
	ItemId id = msg.read.ItemID();
	string text = msg.read.String();
	Item item = FindItemByUID(id);
	if (item == null)
	{
		return;
	}
	BaseEntity entityOwner = item.GetEntityOwner();
	if ((entityOwner != null && entityOwner == msg.player && msg.player.IsRestrainedOrSurrendering) || item.IsLocked() || (item.parent != null && item.parent.IsLocked()) || !CanMoveItemsFrom(item.GetEntityOwner(), item))
	{
		return;
	}
	if (text == "drop")
	{
		int num = item.amount;
		if (msg.read.Unread >= 4)
		{
			num = msg.read.Int32();
		}
		if (!msg.player.isMounted && !msg.player.HasParent() && !GamePhysics.LineOfSight(msg.player.transform.position, msg.player.eyes.position, 1218519041))
		{
			return;
		}
		base.baseEntity.stats.Add("item_drop", 1, (Stats)5);
		if (num < item.amount)
		{
			Item item2 = item.SplitItem(num);
			ItemContainer parent = item.parent;
			if (item2 != null)
			{
				DroppedItem droppedItem = item2.Drop(base.baseEntity.GetDropPosition(), base.baseEntity.GetDropVelocity()) as DroppedItem;
				if (droppedItem != null)
				{
					droppedItem.DropReason = DroppedItem.DropReasonEnum.Player;
					droppedItem.DroppedBy = base.baseEntity.userID;
					droppedItem.DroppedTime = System.DateTime.UtcNow;
					Facepunch.Rust.Analytics.Azure.OnItemDropped(base.baseEntity, droppedItem, DroppedItem.DropReasonEnum.Player);
				}
			}
			parent?.onItemRemovedFromStack?.Invoke(item, num);
		}
		else
		{
			ItemContainer parent2 = item.parent;
			DroppedItem droppedItem2 = item.Drop(base.baseEntity.GetDropPosition(), base.baseEntity.GetDropVelocity()) as DroppedItem;
			if (droppedItem2 != null)
			{
				droppedItem2.DropReason = DroppedItem.DropReasonEnum.Player;
				droppedItem2.DroppedBy = base.baseEntity.userID;
				droppedItem2.DroppedTime = System.DateTime.UtcNow;
				Facepunch.Rust.Analytics.Azure.OnItemDropped(base.baseEntity, droppedItem2, DroppedItem.DropReasonEnum.Player);
			}
			parent2?.onItemAddedRemoved?.Invoke(item, arg2: false);
		}
		base.baseEntity.SignalBroadcast(BaseEntity.Signal.Gesture, "drop_item");
	}
	else
	{
		item.ServerCommand(text, base.baseEntity);
		ItemManager.DoRemoves();
		ServerUpdate(0f);
	}
}

```
:::
