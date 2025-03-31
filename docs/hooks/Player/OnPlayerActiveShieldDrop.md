# OnPlayerActiveShieldDrop
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player drops their active shield item.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerActiveShieldDrop(PlayerBelt playerBelt, Shield local0)
{
	Puts("OnPlayerActiveShieldDrop has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerBelt]
public void DropActive(UnityEngine.Vector3 position, UnityEngine.Vector3 velocity)
{
	if (player.GetActiveShield(out var foundShield))
	{
		DroppedItem droppedItem = foundShield.GetItem().Drop(position, velocity) as DroppedItem;
		if (droppedItem != null)
		{
			droppedItem.DropReason = DroppedItem.DropReasonEnum.Death;
			droppedItem.DroppedBy = player.userID;
			droppedItem.DroppedTime = System.DateTime.UtcNow;
			Facepunch.Rust.Analytics.Azure.OnItemDropped(player, droppedItem, DroppedItem.DropReasonEnum.Death);
		}
	}
	Item activeItem = player.GetActiveItem();
	if (activeItem == null)
	{
		return;
	}
	using (TimeWarning.New("PlayerBelt.DropActive"))
	{
		DroppedItem droppedItem2 = activeItem.Drop(position, velocity) as DroppedItem;
		if (droppedItem2 != null)
		{
			droppedItem2.DropReason = DroppedItem.DropReasonEnum.Death;
			droppedItem2.DroppedBy = player.userID;
			droppedItem2.DroppedTime = System.DateTime.UtcNow;
			Facepunch.Rust.Analytics.Azure.OnItemDropped(player, droppedItem2, DroppedItem.DropReasonEnum.Death);
		}
		player.svActiveItemID = default(ItemId);
		player.SendNetworkUpdate();
	}
}

```
:::
