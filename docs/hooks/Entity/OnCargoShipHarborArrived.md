# OnCargoShipHarborArrived
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when the Cargo Ship has arrived at a harbor and is docked.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnCargoShipHarborArrived(CargoShip cargoShip)
{
	Puts("OnCargoShipHarborArrived has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ CargoShip]
public void OnArrivedAtHarbor()
{
	SetFlag(BaseEntity.Flags.Reserved1, b: true);
	System.Collections.Generic.List<UnityEngine.Transform> obj = Facepunch.Pool.Get<System.Collections.Generic.List<UnityEngine.Transform>>();
	float num = UnityEngine.Random.Range(dock_time * 0.05f, dock_time * 0.1f);
	foreach (HarborCraneContainerPickup allCrane in HarborCraneContainerPickup.AllCranes)
	{
		if (allCrane == null || allCrane.isClient || allCrane.Distance2D(this) > 150f)
		{
			continue;
		}
		obj.Clear();
		CargoShipContainerDestination[] array = containerDestinations;
		foreach (CargoShipContainerDestination cargoShipContainerDestination in array)
		{
			if (allCrane.IsDestinationValidForCrane(cargoShipContainerDestination))
			{
				obj.Add(cargoShipContainerDestination.transform);
			}
		}
		if (obj.Count > 0)
		{
			allCrane.AssignDestination(obj, this, num);
			num += dock_time * UnityEngine.Random.Range(0.1f, 0.15f);
		}
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
	Invoke(PreHarborLeaveHorn, dock_time - 60f);
	if (refresh_loot_on_dock)
	{
		RespawnLoot();
	}
	if (harborIndex == 0)
	{
		SetFlag(BaseEntity.Flags.Reserved3, b: true);
	}
	else if (harborIndex == 1)
	{
		SetFlag(BaseEntity.Flags.Reserved4, b: true);
	}
	Invoke(LeaveHarbor, dock_time);
}

```
:::
