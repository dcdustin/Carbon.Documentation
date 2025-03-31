# OnDieselEngineToggle
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a Diesel Engine (power generator) is toggled on or off (player or logic attempts to change its state).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnDieselEngineToggle()
{
	Puts("OnDieselEngineToggle has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ DieselEngine]
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
:::
