# OnQuarryConsumeFuel
<Badge type="info" text="Resource"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a mining quarry checks for fuel and consumes it to continue running.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnQuarryConsumeFuel(MiningQuarry miningQuarry, Item local0)
{
	Puts("OnQuarryConsumeFuel has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ MiningQuarry]
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
:::
