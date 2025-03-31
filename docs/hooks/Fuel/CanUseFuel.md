<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUseFuel
```csharp
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
