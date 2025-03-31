<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnOvenToggle
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public virtual void SVSwitch(BaseEntity.RPCMessage msg)
{
	bool flag = msg.read.Bit();
	if (flag == IsOn() || (needsBuildingPrivilegeToUse && !msg.player.CanBuild()))
	{
		return;
	}
	if (flag)
	{
		StartCooking();
		if (msg.player != null)
		{
			msg.player.ProcessMissionEvent(BaseMission.MissionEventType.STARTOVEN, new BaseMission.MissionEventPayload
			{
				UintIdentifier = prefabID,
				NetworkIdentifier = net.ID
			}, 1f);
		}
	}
	else
	{
		StopCooking();
	}
}

```
