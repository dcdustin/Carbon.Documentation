<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHuntEventStart
Called when an Egg Hunt event starts (eggs begin spawning).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnHuntEventStart()
{
	Puts("OnHuntEventStart has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ EggHuntEvent]
public void StartEvent()
{
	if (initialSpawnIndex <= BasePlayer.activePlayerList.Count)
	{
		eggSpawningFrameBudget = float.PositiveInfinity;
	}
	EnableEggs();
}

```
:::
