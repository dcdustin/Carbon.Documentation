# OnWorldPrefabSpawned
<Badge type="info" text="World"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a world prefab (map object) is spawned into the game world.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnWorldPrefabSpawned(UnityEngine.GameObject local0, string category)
{
	Puts("OnWorldPrefabSpawned has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ World]
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
:::
