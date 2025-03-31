# OnMissionStart
<Badge type="info" text="Mission"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a mission is about to start for a player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnMissionStart(BaseMission baseMission)
{
	Puts("OnMissionStart has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseMission]
public virtual void MissionStart(BaseMission.MissionInstance instance, BasePlayer assignee)
{
	for (int i = 0; i < objectives.Length; i++)
	{
		objectives[i].Get().MissionStarted(i, instance, assignee);
	}
	if (acceptEffect.isValid)
	{
		DoMissionEffect(acceptEffect.resourcePath, assignee);
	}
	BaseMission.MissionEntityEntry[] array = missionEntities;
	foreach (BaseMission.MissionEntityEntry missionEntityEntry in array)
	{
		if (missionEntityEntry.spawnOnMissionStart)
		{
			instance.GetMissionEntity(missionEntityEntry.identifier, assignee);
		}
	}
	if (AllowedTutorialItems != 0)
	{
		assignee.SetTutorialAllowance(AllowedTutorialItems);
	}
}

```
:::
