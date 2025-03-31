# OnOvenToggle
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an oven or furnace is toggled on or off.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnOvenToggle(BaseOven baseOven, BasePlayer player)
{
	Puts("OnOvenToggle has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseOven]
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
:::
