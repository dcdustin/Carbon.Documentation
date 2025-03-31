# OnInventoryAmmoItemFind
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an entity (e.g., a tool) searches for an ammo or fuel item in a player's inventory.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private Item OnInventoryAmmoItemFind()
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
