<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnWorldPrefabSpawned
```csharp
public static void SpawnPrefab(string category, Prefab prefab, UnityEngine.Vector3 position, UnityEngine.Quaternion rotation, UnityEngine.Vector3 scale)
{
	if (prefab != null && (bool)prefab.Object)
	{
		spawnTimer.Restart();
		if (!Cached)
		{
			prefab.ApplyTerrainPlacements(position, rotation, scale);
			prefab.ApplyTerrainModifiers(position, rotation, scale);
		}
		UnityEngine.GameObject gameObject = prefab.Spawn(position, rotation, scale);
		if ((bool)gameObject)
		{
			UnityEngine.GameObjectEx.SetHierarchyGroup(gameObject, category);
		}
		spawnTimer.Stop();
		spawnTimings.Add(new World.SpawnTiming
		{
			category = category,
			prefab = prefab,
			position = position,
			rotation = rotation,
			scale = scale,
			time = spawnTimer.Elapsed
		});
	}
}

```
