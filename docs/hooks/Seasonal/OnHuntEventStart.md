# OnHuntEventStart
<Badge type="info" text="Seasonal"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an Egg Hunt event starts (eggs begin spawning).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnHuntEventStart(EggHuntEvent eggHuntEvent)
{
	Puts("OnHuntEventStart has been fired!");
	return (object)default;
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
