# OnDemoRecordingStop
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when server demo recording is about to stop.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnDemoRecordingStop(BasePlayer basePlayer, BasePlayer self1)
{
	Puts("OnDemoRecordingStop has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void StopDemoRecording()
{
	if (net != null && net.connection != null && net.connection.IsRecording)
	{
		UnityEngine.Debug.Log(ToString() + " recording stopped: " + net.connection.RecordFilename);
		net.connection.StopRecording();
		CancelInvoke(MonitorDemoRecording);
	}
}

```
:::
