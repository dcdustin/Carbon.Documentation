<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDigitalClockAlarmsSet
Called when the alarm times are set or updated on a digital alarm clock.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnDigitalClockAlarmsSet()
{
	Puts("OnDigitalClockAlarmsSet has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ DigitalClock]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(5uL)]
public void RPC_SetAlarms(BaseEntity.RPCMessage msg)
{
	if (!CanPlayerAdmin(msg.player))
	{
		return;
	}
	ProtoBuf.DigitalClockMessage digitalClockMessage = ProtoBuf.DigitalClockMessage.Deserialize(msg.read);
	System.Collections.Generic.List<ProtoBuf.DigitalClockAlarm> list = digitalClockMessage.alarms;
	alarms.Clear();
	foreach (ProtoBuf.DigitalClockAlarm item2 in list)
	{
		DigitalClock.Alarm item = new DigitalClock.Alarm(item2.time.ToTimeSpan(), item2.active);
		alarms.Add(item);
	}
	muted = digitalClockMessage.muted;
	MarkDirty();
	SendNetworkUpdate();
}

```
:::
