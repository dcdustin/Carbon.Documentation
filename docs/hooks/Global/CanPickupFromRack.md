# CanPickupFromRack
<Badge type="info" text="Global"/><Badge type="danger" text="Carbon Compatible"/>
Determines if a player can pick up an item from a weapon rack.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanPickupFromRack()
{
	Puts("CanPickupFromRack has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ WeaponRack]
public void GivePlayerWeapon(BasePlayer player, int mountSlotIndex, int playerBeltIndex = -1, bool tryHold = true, bool sendUpdate = true)
{
	if (player == null)
	{
		return;
	}
	WeaponRackSlot weaponAtIndex = GetWeaponAtIndex(mountSlotIndex);
	if (weaponAtIndex == null)
	{
		return;
	}
	Item slot = base.inventory.GetSlot(weaponAtIndex.InventoryIndex);
	if (slot == null)
	{
		return;
	}
	ClearSlot(weaponAtIndex);
	bool flag = false;
	bool flag2 = true;
	if (slot.IsBackpack())
	{
		flag2 = false;
		if (slot.info.GetComponent<ItemModBackpack>() != null && player.inventory.GetAnyBackpack() == null)
		{
			flag = slot.MoveToContainer(player.inventory.containerWear);
		}
	}
	if (!flag)
	{
		flag = slot.MoveToContainer(player.inventory.containerBelt, playerBeltIndex);
	}
	if (flag)
	{
		if (flag2 && ((tryHold && player.GetHeldEntity() == null) || playerBeltIndex != -1))
		{
			ClientRPC(RpcTarget.Player("SetActiveBeltSlot", player), slot.position, slot.uid);
		}
		ClientRPC(RpcTarget.Player("PlayGrabSound", player), slot.info.itemid);
	}
	else if (!slot.MoveToContainer(player.inventory.containerMain))
	{
		slot.Drop(base.inventory.dropPosition, base.inventory.dropVelocity);
	}
	if (sendUpdate)
	{
		ItemManager.DoRemoves();
		SendNetworkUpdateImmediate();
	}
}

```
:::
