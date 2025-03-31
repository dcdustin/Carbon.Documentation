<Badge type="danger" text="Carbon Compatible"/>
# CanPickupAllFromRack
```csharp
public void GivePlayerAllWeapons(BasePlayer player, int mountSlotIndex)
{
	if (player == null)
	{
		return;
	}
	WeaponRackSlot weaponAtIndex = GetWeaponAtIndex(mountSlotIndex);
	if (weaponAtIndex != null)
	{
		GivePlayerWeapon(player, weaponAtIndex.GridSlotIndex);
	}
	for (int num = gridSlots.Length - 1; num >= 0; num--)
	{
		WeaponRackSlot weaponRackSlot = gridSlots[num];
		if (weaponRackSlot.Used)
		{
			GivePlayerWeapon(player, weaponRackSlot.GridSlotIndex, -1, tryHold: false);
		}
	}
	ItemManager.DoRemoves();
	SendNetworkUpdateImmediate();
}

```
