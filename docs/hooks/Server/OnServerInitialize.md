# OnServerInitialize
<Badge type="info" text="Server"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when the server begins initialization (loading save, spawning initial entities).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnServerInitialize()
{
	Puts("OnServerInitialize has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ServerMgr]
public bool Initialize(bool loadSave = true, string saveFile = "", bool allowOutOfDateSaves = false, bool skipInitialSpawn = false)
{
	persistance = new UserPersistance(ConVar.Server.rootFolder);
	playerStateManager = new PlayerStateManager(persistance);
	TutorialIsland.GenerateIslandSpawnPoints(loadingSave: true);
	if ((bool)SingletonComponent<SpawnHandler>.Instance)
	{
		using (TimeWarning.New("SpawnHandler.UpdateDistributions"))
		{
			SingletonComponent<SpawnHandler>.Instance.UpdateDistributions();
		}
	}
	if (loadSave)
	{
		World.LoadedFromSave = true;
		World.LoadedFromSave = (skipInitialSpawn = SaveRestore.Load(saveFile, allowOutOfDateSaves));
	}
	else
	{
		SaveRestore.SaveCreatedTime = System.DateTime.UtcNow;
		World.LoadedFromSave = false;
	}
	if (!World.LoadedFromSave)
	{
		SaveRestore.SpawnMapEntities(SaveRestore.FindMapEntities());
	}
	SaveRestore.InitializeWipeId();
	if ((bool)SingletonComponent<SpawnHandler>.Instance)
	{
		if (!skipInitialSpawn)
		{
			using (TimeWarning.New("SpawnHandler.InitialSpawn", 200))
			{
				SingletonComponent<SpawnHandler>.Instance.InitialSpawn();
			}
		}
		using (TimeWarning.New("SpawnHandler.StartSpawnTick", 200))
		{
			SingletonComponent<SpawnHandler>.Instance.StartSpawnTick();
		}
	}
	CreateImportantEntities();
	auth = GetComponent<ConnectionAuth>();
	Facepunch.Rust.Analytics.Azure.Initialize();
	return World.LoadedFromSave;
}

```
:::
