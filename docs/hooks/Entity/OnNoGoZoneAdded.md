<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNoGoZoneAdded
```csharp
public void NoGoZoneAdded(PatrolHelicopterAI.DangerZone zone)
{
	if (use_danger_zones && zone.IsPointInside(base.transform.position))
	{
		ClearTargets();
		ExitCurrentState();
		UnityEngine.Vector3 nearestEdge = zone.GetNearestEdge(base.transform.position);
		nearestEdge.y = UnityEngine.Random.Range(35f, 45f);
		State_Flee_Enter(nearestEdge);
	}
}

```
