<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMissionFailed
```csharp
public virtual void MissionFailed(BaseMission.MissionInstance instance, BasePlayer assignee, BaseMission.MissionFailReason failReason)
{
	if (!instance.GetMission().completeSilently)
	{
		assignee.ChatMessage("You have failed the mission : " + missionName.english);
	}
	DoMissionEffect(failedEffect.resourcePath, assignee);
	Facepunch.Rust.Analytics.Server.MissionFailed(this, failReason);
	Facepunch.Rust.Analytics.Azure.OnMissionComplete(assignee, this, failReason);
	instance.status = BaseMission.MissionStatus.Failed;
	MissionEnded(instance, assignee);
}

```
