<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnServerRestart
```csharp
public static void RestartServer(string strNotice, int iSeconds)
{
	if (!(SingletonComponent<ServerMgr>.Instance == null))
	{
		if (SingletonComponent<ServerMgr>.Instance.restartCoroutine != null)
		{
			ConsoleNetwork.BroadcastToAllClients("chat.add", 2, 0, "<color=#fff>SERVER</color> Restart interrupted!");
			SingletonComponent<ServerMgr>.Instance.StopCoroutine(SingletonComponent<ServerMgr>.Instance.restartCoroutine);
			SingletonComponent<ServerMgr>.Instance.restartCoroutine = null;
		}
		SingletonComponent<ServerMgr>.Instance.restartCoroutine = SingletonComponent<ServerMgr>.Instance.ServerRestartWarning(strNotice, iSeconds);
		SingletonComponent<ServerMgr>.Instance.StartCoroutine(SingletonComponent<ServerMgr>.Instance.restartCoroutine);
		SingletonComponent<ServerMgr>.Instance.UpdateServerInformation();
	}
}

```
