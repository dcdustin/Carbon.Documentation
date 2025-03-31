<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHuntEventStart
```csharp
public void StartEvent()
{
	if (initialSpawnIndex <= BasePlayer.activePlayerList.Count)
	{
		eggSpawningFrameBudget = float.PositiveInfinity;
	}
	EnableEggs();
}

```
