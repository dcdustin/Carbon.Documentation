<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFindSpawnPoint
Called when determining a spawn point for a player (allows customizing spawn location).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private BasePlayer.SpawnPoint OnFindSpawnPoint()
{
	Puts("OnFindSpawnPoint has been fired!");
	return (BasePlayer.SpawnPoint)default;
}
```
```csharp [Source — Assembly-CSharp @ ServerMgr]
public static BasePlayer.SpawnPoint FindSpawnPoint(BasePlayer forPlayer = null)
{
	bool flag = false;
	if (forPlayer != null && forPlayer.IsInTutorial)
	{
		TutorialIsland currentTutorialIsland = forPlayer.GetCurrentTutorialIsland();
		if (currentTutorialIsland != null)
		{
			BasePlayer.SpawnPoint spawnPoint = new BasePlayer.SpawnPoint();
			if (forPlayer.CurrentTutorialAllowance > BasePlayer.TutorialItemAllowance.Level1_HatchetPickaxe)
			{
				spawnPoint.pos = currentTutorialIsland.MidMissionSpawnPoint.position;
				spawnPoint.rot = currentTutorialIsland.MidMissionSpawnPoint.rotation;
			}
			else
			{
				spawnPoint.pos = currentTutorialIsland.InitialSpawnPoint.position;
				spawnPoint.rot = currentTutorialIsland.InitialSpawnPoint.rotation;
			}
			return spawnPoint;
		}
	}
	BaseGameMode baseGameMode = Gamemode();
	if ((bool)baseGameMode && baseGameMode.useCustomSpawns)
	{
		BasePlayer.SpawnPoint playerSpawn = baseGameMode.GetPlayerSpawn(forPlayer);
		if (playerSpawn != null)
		{
			return playerSpawn;
		}
	}
	if (SingletonComponent<SpawnHandler>.Instance != null && !flag)
	{
		BasePlayer.SpawnPoint spawnPoint2 = SpawnHandler.GetSpawnPoint();
		if (spawnPoint2 != null)
		{
			return spawnPoint2;
		}
	}
	BasePlayer.SpawnPoint spawnPoint3 = new BasePlayer.SpawnPoint();
	if (forPlayer != null && forPlayer.IsInTutorial)
	{
		TutorialIsland currentTutorialIsland2 = forPlayer.GetCurrentTutorialIsland();
		if (currentTutorialIsland2 != null)
		{
			spawnPoint3.pos = currentTutorialIsland2.InitialSpawnPoint.position;
			spawnPoint3.rot = currentTutorialIsland2.InitialSpawnPoint.rotation;
			return spawnPoint3;
		}
	}
	UnityEngine.GameObject[] array = UnityEngine.GameObject.FindGameObjectsWithTag("spawnpoint");
	if (array.Length != 0)
	{
		UnityEngine.GameObject gameObject = array[UnityEngine.Random.Range(0, array.Length)];
		spawnPoint3.pos = gameObject.transform.position;
		spawnPoint3.rot = gameObject.transform.rotation;
	}
	else
	{
		UnityEngine.Debug.Log("Couldn't find an appropriate spawnpoint for the player - so spawning at camera");
		if (MainCamera.mainCamera != null)
		{
			spawnPoint3.pos = MainCamera.position;
			spawnPoint3.rot = MainCamera.rotation;
		}
	}
	if (UnityEngine.Physics.Raycast(new UnityEngine.Ray(spawnPoint3.pos, UnityEngine.Vector3.down), out var hitInfo, 32f, 1537286401))
	{
		spawnPoint3.pos = hitInfo.point;
	}
	return spawnPoint3;
}

```
:::
