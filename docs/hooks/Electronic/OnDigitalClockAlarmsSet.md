# OnDigitalClockAlarmsSet
<Badge type="info" text="Electronic"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when the alarm times are set or updated on a digital alarm clock.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnDigitalClockAlarmsSet(DigitalClock digitalClock, ProtoBuf.DigitalClockMessage local0)
{
	Puts("OnDigitalClockAlarmsSet has been fired!");
	return (object)default;
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
