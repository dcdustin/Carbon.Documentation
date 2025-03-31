# OnActiveItemChanged
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a player has switched their active item.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnActiveItemChanged(BasePlayer basePlayer, Item local1, Item local2)
{
	Puts("OnActiveItemChanged has been fired!");
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
