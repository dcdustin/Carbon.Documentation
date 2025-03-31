<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnScientistRecalled
Called when a scientist NPC is recalled or removed (for example, after an event).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnScientistRecalled()
{
	Puts("OnScientistRecalled has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BradleyAPC]
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
:::
