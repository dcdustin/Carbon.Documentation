<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDieselEngineToggle
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(6f)]
public void EngineSwitch(BaseEntity.RPCMessage msg)
{
	if (msg.read.Bit())
	{
		if (GetFuelAmount() > 0)
		{
			EngineOn();
			startedByPlayer = msg.player;
			if (Rust.GameInfo.HasAchievements && msg.player != null)
			{
				msg.player.stats.Add("excavator_activated", 1, Stats.All);
				msg.player.stats.Save(forceSteamSave: true);
			}
		}
	}
	else
	{
		EngineOff();
	}
}

```
