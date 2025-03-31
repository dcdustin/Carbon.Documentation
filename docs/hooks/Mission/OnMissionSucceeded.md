# OnMissionSucceeded
<Badge type="info" text="Mission"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player completes a mission successfully.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnMissionSucceeded(BaseMission baseMission)
{
	Puts("OnMissionSucceeded has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseMission]
public virtual void MissionSuccess(BaseMission.MissionInstance instance, BasePlayer assignee)
{
	instance.status = BaseMission.MissionStatus.Accomplished;
	MissionEnded(instance, assignee);
	MissionComplete(instance, assignee);
}

```
:::
