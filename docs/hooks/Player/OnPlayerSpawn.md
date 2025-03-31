<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerSpawn
Called when a player spawns into the world (initial spawn or respawn).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerSpawn()
{
	Puts("OnPlayerSpawn has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ServerMgr]
public BasePlayer SpawnNewPlayer(Network.Connection connection)
{
	BasePlayer.SpawnPoint spawnPoint = FindSpawnPoint();
	BasePlayer basePlayer = GameManager.server.CreateEntity("assets/prefabs/player/player.prefab", spawnPoint.pos, spawnPoint.rot).ToPlayer();
	basePlayer.health = 0f;
	basePlayer.lifestate = BaseCombatEntity.LifeState.Dead;
	basePlayer.ResetLifeStateOnSpawn = false;
	basePlayer.limitNetworking = true;
	if (connection == null)
	{
		basePlayer.EnableTransferProtection();
	}
	basePlayer.Spawn();
	basePlayer.limitNetworking = false;
	if (connection != null)
	{
		basePlayer.PlayerInit(connection);
		if ((bool)BaseGameMode.GetActiveGameMode(serverside: true))
		{
			BaseGameMode.GetActiveGameMode(serverside: true).OnNewPlayer(basePlayer);
		}
		else if (UnityEngine.Application.isEditor || (SleepingBag.FindForPlayer(basePlayer.userID, ignoreTimers: true).Length == 0 && !basePlayer.hasPreviousLife))
		{
			basePlayer.Respawn();
		}
		UnityEngine.DebugEx.Log($"{basePlayer.displayName} with steamid {basePlayer.userID.Get()} joined from ip {basePlayer.net.connection.ipaddress}");
		UnityEngine.DebugEx.Log($"\tNetworkId {basePlayer.userID.Get()} is {basePlayer.net.ID} ({basePlayer.displayName})");
		if (basePlayer.net.connection.ownerid != 0L && basePlayer.net.connection.ownerid != basePlayer.net.connection.userid)
		{
			UnityEngine.DebugEx.Log($"\t{basePlayer} is sharing the account {basePlayer.net.connection.ownerid}");
		}
	}
	return basePlayer;
}

```
:::
