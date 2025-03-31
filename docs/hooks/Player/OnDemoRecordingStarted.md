<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDemoRecordingStarted
```csharp
public void StartDemoRecording()
{
	if (net != null && net.connection != null && !net.connection.IsRecording)
	{
		string text = $"demos/{UserIDString}/{System.DateTime.Now:yyyy-MM-dd-hhmmss}.dem";
		UnityEngine.Debug.Log(ToString() + " recording started: " + text);
		net.connection.StartRecording(text, new ConVar.Demo.Header
		{
			version = ConVar.Demo.Version,
			level = UnityEngine.Application.loadedLevelName,
			levelSeed = World.Seed,
			levelSize = World.Size,
			checksum = World.Checksum,
			localclient = userID,
			position = eyes.position,
			rotation = eyes.HeadForward(),
			levelUrl = World.Url,
			recordedTime = System.DateTime.Now.ToBinary()
		});
		SendNetworkUpdateImmediate();
		SendGlobalSnapshot();
		SendFullSnapshot();
		SendEntityUpdate();
		TreeManager.SendSnapshot(this);
		ServerMgr.SendReplicatedVars(net.connection);
		InvokeRepeating(MonitorDemoRecording, 10f, 10f);
	}
}

```
