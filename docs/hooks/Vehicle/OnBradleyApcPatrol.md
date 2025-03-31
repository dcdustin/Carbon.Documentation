# OnBradleyApcPatrol
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when the Bradley APC starts or continues its patrol route.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBradleyApcPatrol()
{
	Puts("OnBradleyApcPatrol has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BradleyAPC]
public void UpdateMovement_Patrol()
{
	if (patrolPath == null || UnityEngine.Time.time < nextPatrolTime)
	{
		return;
	}
	nextPatrolTime = UnityEngine.Time.time + 20f;
	if (HasPath() && !IsAtFinalDestination())
	{
		return;
	}
	IAIPathInterestNode randomInterestNodeAwayFrom = patrolPath.GetRandomInterestNodeAwayFrom(base.transform.position);
	IAIPathNode closestToPoint = patrolPath.GetClosestToPoint(randomInterestNodeAwayFrom.Position);
	bool flag = false;
	System.Collections.Generic.List<IAIPathNode> nodes = Facepunch.Pool.Get<System.Collections.Generic.List<IAIPathNode>>();
	IAIPathNode iAIPathNode;
	if (GetEngagementPath(ref nodes))
	{
		flag = true;
		iAIPathNode = nodes[nodes.Count - 1];
	}
	else
	{
		iAIPathNode = patrolPath.GetClosestToPoint(base.transform.position);
	}
	if (!(UnityEngine.Vector3.Distance(finalDestination, closestToPoint.Position) > 2f))
	{
		return;
	}
	if (closestToPoint == iAIPathNode)
	{
		currentPath.Clear();
		currentPath.Add(closestToPoint.Position);
		currentPathIndex = -1;
		pathLooping = false;
		finalDestination = closestToPoint.Position;
	}
	else
	{
		if (!Rust.Ai.AStarPath.FindPath(iAIPathNode, closestToPoint, out var path, out var _))
		{
			return;
		}
		currentPath.Clear();
		if (flag)
		{
			for (int i = 0; i < nodes.Count - 1; i++)
			{
				currentPath.Add(nodes[i].Position);
			}
		}
		foreach (IAIPathNode item in path)
		{
			currentPath.Add(item.Position);
		}
		currentPathIndex = -1;
		pathLooping = false;
		finalDestination = closestToPoint.Position;
	}
}

```
:::
