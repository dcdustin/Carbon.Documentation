<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFuelItemCheck
```csharp
public Item GetFuelItem()
{
	StorageContainer fuelContainer = GetFuelContainer();
	if (fuelContainer == null)
	{
		return null;
	}
	return fuelContainer.inventory.GetSlot(0);
}

```
