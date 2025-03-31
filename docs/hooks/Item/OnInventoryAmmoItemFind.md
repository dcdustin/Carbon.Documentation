<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInventoryAmmoItemFind [FlameThrower]
```csharp
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
