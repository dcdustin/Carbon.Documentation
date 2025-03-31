<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDemoRecordingStopped
```csharp
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
