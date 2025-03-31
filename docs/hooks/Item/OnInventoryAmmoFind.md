<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInventoryAmmoFind
```csharp
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
