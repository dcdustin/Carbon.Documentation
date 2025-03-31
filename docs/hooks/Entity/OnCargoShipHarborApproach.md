# OnCargoShipHarborApproach
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when the Cargo Ship is approaching a harbor (coming in to dock).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCargoShipHarborApproach(CargoShip cargoShip)
{
	Puts("OnCargoShipHarborApproach has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ CargoShip]
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
:::
