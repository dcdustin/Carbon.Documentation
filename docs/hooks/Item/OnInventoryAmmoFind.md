<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInventoryAmmoFind
Called when searching a player's inventory for ammo of a specific type.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnInventoryAmmoFind()
{
	Puts("OnInventoryAmmoFind has been fired!");
	return (System.Object)default;
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
