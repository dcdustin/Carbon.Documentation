<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnServerInitialized
Called when the server has finished initializing (startup complete).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnServerInitialized()
{
	Puts("OnServerInitialized has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ServerMgr]
public void OpenConnection(bool useSteamServer = true)
{
	if (ConVar.Server.queryport <= 0 || ConVar.Server.queryport == ConVar.Server.port)
	{
		ConVar.Server.queryport = System.Math.Max(ConVar.Server.port, Facepunch.RCon.Port) + 1;
	}
	Network.Net.sv.ip = ConVar.Server.ip;
	Network.Net.sv.port = ConVar.Server.port;
	if (useSteamServer)
	{
		StartSteamServer();
	}
	else
	{
		PlatformService.Instance.Initialize(RustPlatformHooks.Instance);
	}
	if (!Network.Net.sv.Start(this))
	{
		UnityEngine.Debug.LogWarning("Couldn't Start Server.");
		CloseConnection();
		return;
	}
	Network.Net.sv.cryptography = new NetworkCryptographyServer();
	EACServer.DoStartup();
	InvokeRepeating("DoTick", 1f, 1f / (float)ConVar.Server.tickrate);
	InvokeRepeating("DoHeartbeat", 1f, 1f);
	runFrameUpdate = true;
	ConsoleSystem.OnReplicatedVarChanged += OnReplicatedVarChanged;
	if (ConVar.Server.autoUploadMap)
	{
		MapUploader.UploadMap();
	}
}

```
:::
