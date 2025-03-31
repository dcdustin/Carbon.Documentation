# OnRackedWeaponUnload
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a weapon on a rack is being unloaded (ammo removed).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRackedWeaponUnload(Item local1, BasePlayer player, WeaponRack weaponRack)
{
	Puts("OnRackedWeaponUnload has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ WeaponRack]
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
:::
