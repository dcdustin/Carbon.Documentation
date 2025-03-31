# OnActiveItemChange
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player is about to switch their active (held) item.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnActiveItemChange(BasePlayer basePlayer, Item local1, ItemId itemID)
{
	Puts("OnActiveItemChange has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
#define UNITY_ASSERTIONS
public void UpdateActiveItem(ItemId itemID)
{
	UnityEngine.Assertions.Assert.IsTrue(base.isServer, "Realm should be server!");
	if (svActiveItemID == itemID)
	{
		return;
	}
	if (equippingBlocked)
	{
		itemID = default(ItemId);
	}
	Item item = inventory.containerBelt.FindItemByUID(itemID);
	if (IsItemHoldRestricted(item))
	{
		itemID = default(ItemId);
	}
	Item activeItem = GetActiveItem();
	svActiveItemID = default(ItemId);
	if (activeItem != null)
	{
		HeldEntity heldEntity = activeItem.GetHeldEntity() as HeldEntity;
		if (heldEntity != null)
		{
			heldEntity.SetHeld(bHeld: false);
		}
	}
	svActiveItemID = itemID;
	SendNetworkUpdate();
	Item activeItem2 = GetActiveItem();
	if (activeItem2 != null)
	{
		HeldEntity heldEntity2 = activeItem2.GetHeldEntity() as HeldEntity;
		if (heldEntity2 != null)
		{
			heldEntity2.SetHeld(bHeld: true);
		}
		NotifyGesturesNewItemEquipped();
	}
	inventory.UpdatedVisibleHolsteredItems();
}

```
:::
