<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRackedWeaponUnloaded
```csharp
public void UnloadWeapon(BasePlayer player, int mountSlotIndex)
{
	if (player == null)
	{
		return;
	}
	WeaponRackSlot weaponAtIndex = GetWeaponAtIndex(mountSlotIndex);
	if (weaponAtIndex == null || !weaponAtIndex.CanBeReloadedAtWeaponRack())
	{
		return;
	}
	Item slot = base.inventory.GetSlot(weaponAtIndex.InventoryIndex);
	if (slot == null)
	{
		return;
	}
	BaseEntity heldEntity = slot.GetHeldEntity();
	if (!(heldEntity == null))
	{
		BaseProjectile component = heldEntity.GetComponent<BaseProjectile>();
		if (!(component == null))
		{
			ItemDefinition ammoType = component.primaryMagazine.ammoType;
			component.UnloadAmmo(slot, player);
			SetSlotAmmoDetails(weaponAtIndex, slot);
			SendNetworkUpdateImmediate();
			ClientRPC(RpcTarget.Player("PlayAmmoSound", player), ammoType.itemid, 1);
		}
	}
}

```
