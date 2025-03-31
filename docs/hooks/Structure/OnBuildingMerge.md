<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBuildingMerge
```csharp
public void Merge(BuildingManager.Building building1, BuildingManager.Building building2)
{
	while (building2.HasDecayEntities())
	{
		building2.decayEntities[0].AttachToBuilding(building1.ID);
	}
	if (ConVar.AI.nav_carve_use_building_optimization)
	{
		building1.isNavMeshCarvingDirty = true;
		building2.isNavMeshCarvingDirty = true;
		int ticks = 3;
		UpdateNavMeshCarver(building1, ref ticks, 0);
		UpdateNavMeshCarver(building1, ref ticks, 0);
	}
}

```
