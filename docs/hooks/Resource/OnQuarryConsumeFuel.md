<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnQuarryConsumeFuel
```csharp
public bool FuelCheck()
{
	if (pendingWork > 0f)
	{
		return true;
	}
	Item item = fuelStoragePrefab.instance.GetComponent<StorageContainer>().inventory.FindItemByItemName("diesel_barrel");
	if (item != null && item.amount >= 1)
	{
		pendingWork += workPerFuel;
		Facepunch.Rust.Analytics.Azure.OnQuarryItem(Facepunch.Rust.Analytics.Azure.ResourceMode.Consumed, item.info.shortname, 1, this);
		item.UseItem();
		return true;
	}
	return false;
}

```
