# OnNoGoZoneAdded
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a no-fly (no-go) zone is added for the patrol helicopter (restricting where the heli can go).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNoGoZoneAdded(PatrolHelicopterAI patrolHelicopterAI)
{
	Puts("OnNoGoZoneAdded has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ PatrolHelicopterAI]
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
:::
