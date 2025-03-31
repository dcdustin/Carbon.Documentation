<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCargoShipSpawnCrate
```csharp
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
