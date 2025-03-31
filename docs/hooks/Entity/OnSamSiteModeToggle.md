<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSamSiteModeToggle
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(1uL)]
public void ToggleDefenderMode(BaseEntity.RPCMessage msg)
{
	if (staticRespawn)
	{
		return;
	}
	BasePlayer player = msg.player;
	if (!(player == null) && player.CanBuild())
	{
		bool flag = msg.read.Bit();
		if (flag != IsInDefenderMode())
		{
			SetFlag(Flag_ManuallySetMode, flag);
			SetFlag(Flag_TargetMode, flag);
		}
	}
}

```
