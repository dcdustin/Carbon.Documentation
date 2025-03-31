<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFuelAmountCheck
```csharp
public int GetFuelAmount()
{
	Item fuelItem = GetFuelItem();
	if (fuelItem == null || fuelItem.amount < 1)
	{
		return 0;
	}
	return fuelItem.amount;
}

```
