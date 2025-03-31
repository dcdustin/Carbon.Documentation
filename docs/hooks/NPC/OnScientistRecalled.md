<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnScientistRecalled [BradleyAPC]
```csharp
public void OnScientistMounted(ScientistNPC scientist)
{
	if (!(scientist == null))
	{
		if (scientistPrefabLookUp.TryGetValue(scientist.prefabID, out var value))
		{
			mountedScientistPrefabs.Add(value);
		}
		activeScientists.Remove(scientist);
		numberOfScientistsToSpawn++;
	}
}

```
