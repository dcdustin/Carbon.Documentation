<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMissionAssigned
Called when a mission is assigned to a player.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnMissionAssigned()
{
	Puts("OnMissionAssigned has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseMission]
public static bool AssignMission(BasePlayer assignee, IMissionProvider provider, BaseMission mission)
{
	if (!missionsenabled)
	{
		return false;
	}
	if (!mission.IsEligableForMission(assignee, provider))
	{
		return false;
	}
	int num = Facepunch.Extend.List.FindIndexWith(assignee.missions, (BaseMission.MissionInstance i) => i.missionID, mission.id);
	BaseMission.MissionInstance missionInstance;
	int activeMission;
	if (num >= 0)
	{
		missionInstance = assignee.missions[num];
		activeMission = num;
		missionInstance.Reset();
	}
	else
	{
		missionInstance = Facepunch.Pool.Get<BaseMission.MissionInstance>();
		activeMission = assignee.missions.Count;
		assignee.missions.Add(missionInstance);
	}
	missionInstance.missionID = mission.id;
	missionInstance.startTime = UnityEngine.Time.time;
	missionInstance.providerID = provider.ProviderID();
	missionInstance.status = BaseMission.MissionStatus.Active;
	missionInstance.objectiveStatuses = new BaseMission.MissionInstance.ObjectiveStatus[mission.objectives.Length];
	for (int j = 0; j < mission.objectives.Length; j++)
	{
		missionInstance.objectiveStatuses[j] = new BaseMission.MissionInstance.ObjectiveStatus();
	}
	mission.MissionStart(missionInstance, assignee);
	assignee.SetActiveMission(activeMission);
	assignee.MissionDirty();
	return true;
}

```
:::
