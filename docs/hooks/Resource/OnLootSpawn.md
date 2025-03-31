<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLootSpawn [LootContainer]
```csharp
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
