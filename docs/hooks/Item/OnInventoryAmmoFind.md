# OnInventoryAmmoFind
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when searching a player's inventory for ammo of a specific type.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnInventoryAmmoFind(PlayerInventory playerInventory)
{
	Puts("OnInventoryAmmoFind has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerInventory]
public Item FindAmmo(Rust.AmmoTypes ammoType)
{
	Item item = containerMain?.FindAmmo(ammoType);
	if (item == null)
	{
		item = containerBelt?.FindAmmo(ammoType);
	}
	return item;
}

```
:::
