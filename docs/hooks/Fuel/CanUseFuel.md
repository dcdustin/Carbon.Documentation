# CanUseFuel
<Badge type="info" text="Fuel"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Determines if an entity is allowed to consume fuel at that time.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUseFuel(EntityFuelSystem entityFuelSystem, StorageContainer local0, float seconds, float fuelUsedPerSecond)
{
	Puts("CanUseFuel has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ EntityFuelSystem]
public int TryUseFuel(float seconds, float fuelUsedPerSecond)
{
	StorageContainer fuelContainer = GetFuelContainer();
	if (fuelContainer == null)
	{
		return 0;
	}
	Item slot = fuelContainer.inventory.GetSlot(0);
	if (slot == null || slot.amount < 1)
	{
		return 0;
	}
	pendingFuel += seconds * fuelUsedPerSecond;
	if (pendingFuel >= 1f)
	{
		int num = UnityEngine.Mathf.FloorToInt(pendingFuel);
		slot.UseItem(num);
		Facepunch.Rust.Analytics.Azure.AddPendingItems(fuelContainer?.GetParentEntity() ?? fuelContainer, slot.info.shortname, num, "fuel_system");
		pendingFuel -= num;
		return num;
	}
	return 0;
}

```
:::
