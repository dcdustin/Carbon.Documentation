<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBradleyApcHunt
```csharp
public void UpdateMovement_Hunt()
{
	if (patrolPath == null)
	{
		return;
	}
	BradleyAPC.TargetInfo targetInfo = targetList[0];
	if (!targetInfo.IsValid())
	{
		return;
	}
	if (HasPath() && targetInfo.IsVisible())
	{
		if (currentPath.Count > 1)
		{
			UnityEngine.Vector3 item = currentPath[currentPathIndex];
			ClearPath();
			currentPath.Add(item);
			finalDestination = item;
			currentPathIndex = 0;
		}
	}
	else
	{
		if (!(UnityEngine.Time.time > nextEngagementPathTime) || HasPath() || targetInfo.IsVisible())
		{
			return;
		}
		bool flag = false;
		IAIPathNode start = patrolPath.GetClosestToPoint(base.transform.position);
		System.Collections.Generic.List<IAIPathNode> nodes = Facepunch.Pool.Get<System.Collections.Generic.List<IAIPathNode>>();
		if (GetEngagementPath(ref nodes))
		{
			flag = true;
			start = nodes[nodes.Count - 1];
		}
		IAIPathNode iAIPathNode = null;
		System.Collections.Generic.List<IAIPathNode> nearNodes = Facepunch.Pool.Get<System.Collections.Generic.List<IAIPathNode>>();
		patrolPath.GetNodesNear(targetInfo.lastSeenPosition, ref nearNodes, 30f);
		System.Collections.Generic.Stack<IAIPathNode> stack = null;
		float num = float.PositiveInfinity;
		float y = mainTurretEyePos.localPosition.y;
		foreach (IAIPathNode item2 in nearNodes)
		{
			System.Collections.Generic.Stack<IAIPathNode> path = new System.Collections.Generic.Stack<IAIPathNode>();
			if (targetInfo.entity.IsVisible(item2.Position + new UnityEngine.Vector3(0f, y, 0f)) && Rust.Ai.AStarPath.FindPath(start, item2, out path, out var pathCost) && pathCost < num)
			{
				stack = path;
				num = pathCost;
				iAIPathNode = item2;
			}
		}
		if (stack == null && nearNodes.Count > 0)
		{
			System.Collections.Generic.Stack<IAIPathNode> path2 = new System.Collections.Generic.Stack<IAIPathNode>();
			IAIPathNode iAIPathNode2 = nearNodes[UnityEngine.Random.Range(0, nearNodes.Count)];
			if (Rust.Ai.AStarPath.FindPath(start, iAIPathNode2, out path2, out var pathCost2) && pathCost2 < num)
			{
				stack = path2;
				iAIPathNode = iAIPathNode2;
			}
		}
		if (stack != null)
		{
			currentPath.Clear();
			if (flag)
			{
				for (int i = 0; i < nodes.Count - 1; i++)
				{
					currentPath.Add(nodes[i].Position);
				}
			}
			foreach (IAIPathNode item3 in stack)
			{
				currentPath.Add(item3.Position);
			}
			currentPathIndex = -1;
			pathLooping = false;
			finalDestination = iAIPathNode.Position;
		}
		Facepunch.Pool.FreeUnmanaged(ref nearNodes);
		Facepunch.Pool.FreeUnmanaged(ref nodes);
		nextEngagementPathTime = UnityEngine.Time.time + 5f;
	}
}

```
