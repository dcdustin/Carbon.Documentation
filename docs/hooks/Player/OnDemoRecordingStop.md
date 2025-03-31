<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDemoRecordingStop
Called when server demo recording is about to stop.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnDemoRecordingStop()
{
	Puts("OnDemoRecordingStop has been fired!");
	return (System.Object)default;
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
