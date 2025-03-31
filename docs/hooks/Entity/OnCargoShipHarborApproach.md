<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCargoShipHarborApproach
```csharp
public void StartHarborApproach(CargoNotifier cn)
{
	PlayHorn();
	isDoingHarborApproach = true;
	dockCount++;
	shouldLookAhead = false;
	if (proxManager != null)
	{
		proxManager.StartMovement();
	}
	ClearAllHarborEntitiesOnShip();
	foreach (HarborCraneContainerPickup allCrane in HarborCraneContainerPickup.AllCranes)
	{
		if (!(allCrane == null) && !allCrane.isClient && !(allCrane.Distance2D(harborApproachPath.nodes[harborApproachPath.nodes.Count / 2].Position) > 150f))
		{
			allCrane.ReplenishContainers();
		}
	}
}

```
