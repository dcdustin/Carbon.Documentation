# OnMissionStarted
<Badge type="info" text="Mission"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a mission has started for a player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnMissionStarted(BaseMission baseMission)
{
	Puts("OnMissionStarted has been fired!");
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
