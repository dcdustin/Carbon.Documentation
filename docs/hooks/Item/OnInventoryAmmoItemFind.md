# OnInventoryAmmoItemFind
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an entity (e.g., a tool) searches for an ammo or fuel item in a player's inventory.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private Item OnInventoryAmmoItemFind(PlayerInventory inventory, FlameThrower flameThrower)
{
	Puts("OnInventoryAmmoItemFind has been fired!");
	return (Item)default;
}
```
```csharp [Source — Assembly-CSharp @ FlameThrower]
public Item GetAmmo()
{
	BasePlayer ownerPlayer = GetOwnerPlayer();
	if (!ownerPlayer)
	{
		return null;
	}
	return ownerPlayer.inventory.FindItemByItemName(fuelType.shortname);
}

```
:::
