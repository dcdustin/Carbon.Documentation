# CanDeployScientists
<Badge type="info" text="NPC"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Determines if NPC scientists can be deployed (spawned) in an event.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanDeployScientists(BradleyAPC bradleyAPC)
{
	Puts("CanDeployScientists has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ BradleyAPC]
public bool CanDeployScientists(BaseEntity attacker, System.Collections.Generic.List<GameObjectRef> scientistPrefabs, System.Collections.Generic.List<UnityEngine.Vector3> spawnPositions)
{
	int count = scientistPrefabs.Count;
	if (!inDeployedState && UnityEngine.Vector3.Distance(attacker.transform.position, base.transform.position) > DeployAttackDistanceMax)
	{
		return false;
	}
	spawnPositions.Clear();
	bool flag = false;
	int num = 0;
	int num2 = 0;
	int layerMask = 8454144;
	while (!flag)
	{
		if (UnityEngine.Physics.Raycast(ScientistSpawnPoints[num2 % ScientistSpawnPoints.Count].transform.position + UnityEngine.Vector3.up * 1f, UnityEngine.Vector3.down, out var hitInfo, 2f, layerMask) && UnityEngine.AI.NavMesh.SamplePosition(hitInfo.point + UnityEngine.Vector3.up * 0.3f, out var _, 6f, walkableAreaMask))
		{
			spawnPositions.Add(hitInfo.point + UnityEngine.Vector3.up * 0.1f);
			num2++;
			if (num2 >= count)
			{
				break;
			}
		}
		else
		{
			num++;
			if (num > count * 2)
			{
				flag = true;
			}
		}
	}
	return !flag;
}

```
:::
