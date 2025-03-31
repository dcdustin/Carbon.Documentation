<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCargoShipSpawnCrate
Called when a locked crate spawns on the Cargo Ship (e.g., timed crate spawn during the event).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCargoShipSpawnCrate()
{
	Puts("OnCargoShipSpawnCrate has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ CargoShip]
public void RespawnLoot()
{
	InvokeRepeating(PlayHorn, 0f, 8f);
	SpawnCrate(lockedCratePrefab.resourcePath);
	SpawnCrate(eliteCratePrefab.resourcePath);
	for (int i = 0; i < 4; i++)
	{
		SpawnCrate(militaryCratePrefab.resourcePath);
	}
	for (int j = 0; j < 4; j++)
	{
		SpawnCrate(junkCratePrefab.resourcePath);
	}
	lootRoundsPassed++;
	if (lootRoundsPassed >= loot_rounds)
	{
		CancelInvoke(RespawnLoot);
	}
}

```
:::
