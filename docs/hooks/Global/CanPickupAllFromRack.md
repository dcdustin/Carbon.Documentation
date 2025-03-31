# CanPickupAllFromRack
<Badge type="info" text="Global"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)
Determines if a player can remove all items from a weapon rack at once.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanPickupAllFromRack(WeaponRack rack, BasePlayer player, int mountSlotIndex)
{
	Puts("CanPickupAllFromRack has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ WeaponRack]
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
:::
