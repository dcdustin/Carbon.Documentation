# OnFuelAmountCheck
<Badge type="info" text="Fuel"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when checking the current amount of fuel in an entity.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private int OnFuelAmountCheck()
{
	Puts("OnFuelAmountCheck has been fired!");
	return (System.Int32)default;
}
```
```csharp [Source — Assembly-CSharp @ EntityFuelSystem]
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
:::
