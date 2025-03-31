# OnPlayerRespawn
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Triggered when a player respawns (e.g., after death or at a sleeping bag).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerRespawn(BasePlayer player, SleepingBag local2)
{
	Puts("OnPlayerRespawn has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ SleepingBag]
public static bool SpawnPlayer(BasePlayer player, NetworkableId sleepingBag)
{
	SleepingBag[] array = FindForPlayer(player.userID, ignoreTimers: true);
	SleepingBag sleepingBag2 = System.Linq.Enumerable.FirstOrDefault(array, (SleepingBag x) => x.ValidForPlayer(player.userID, ignoreTimers: false) && x.net.ID == sleepingBag && x.unlockTime < UnityEngine.Time.realtimeSinceStartup);
	if (sleepingBag2 == null)
	{
		return false;
	}
	if (sleepingBag2.GetRespawnState(player.userID) != ProtoBuf.RespawnInformation.SpawnOptions.RespawnState.OK)
	{
		return false;
	}
	sleepingBag2.GetSpawnPos(out var pos, out var rot);
	player.RespawnAt(pos, rot, sleepingBag2);
	sleepingBag2.PostPlayerSpawn(player);
	SleepingBag[] array2 = array;
	for (int i = 0; i < array2.Length; i++)
	{
		SetBagTimer(array2[i], pos, SleepingBag.SleepingBagResetReason.Respawned, player);
	}
	return true;
}

```
:::
