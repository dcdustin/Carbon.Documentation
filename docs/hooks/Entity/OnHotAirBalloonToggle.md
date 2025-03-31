<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHotAirBalloonToggle
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void EngineSwitch(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!(player == null) && (!OnlyOwnerAccessible() || !(player != creatorEntity)))
	{
		bool b = msg.read.Bit();
		SetFlag(BaseEntity.Flags.On, b);
		if (IsOn())
		{
			Invoke(ScheduleOff, 60f);
		}
		else
		{
			CancelInvoke(ScheduleOff);
		}
	}
}

```
