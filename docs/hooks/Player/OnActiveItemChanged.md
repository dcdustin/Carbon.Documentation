<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnActiveItemChanged
```csharp
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
