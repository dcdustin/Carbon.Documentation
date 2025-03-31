# OnLootSpawn
<Badge type="info" text="Resource"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a loot container spawns its loot items (populate loot).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnLootSpawn(LootContainer lootContainer)
{
	Puts("OnLootSpawn has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ LootContainer]
public virtual void SpawnLoot()
{
	if (base.inventory == null)
	{
		UnityEngine.Debug.Log("CONTACT DEVELOPERS! LootContainer::PopulateLoot has null inventory!!!");
		return;
	}
	base.inventory.Clear();
	ItemManager.DoRemoves();
	PopulateLoot();
	if (shouldRefreshContents)
	{
		Invoke(SpawnLoot, UnityEngine.Random.Range(minSecondsBetweenRefresh, maxSecondsBetweenRefresh));
	}
}

```
:::
