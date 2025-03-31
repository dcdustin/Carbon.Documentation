<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMissionSucceeded
```csharp
public virtual void MissionSuccess(BaseMission.MissionInstance instance, BasePlayer assignee)
{
	instance.status = BaseMission.MissionStatus.Accomplished;
	MissionEnded(instance, assignee);
	MissionComplete(instance, assignee);
}

```
