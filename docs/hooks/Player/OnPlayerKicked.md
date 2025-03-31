<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerKicked [EAC]
```csharp
public static void OnClientActionRequired(ref Epic.OnlineServices.AntiCheatCommon.OnClientActionRequiredCallbackInfo data)
{
	using (TimeWarning.New("OnClientActionRequired", 10))
	{
		System.IntPtr clientHandle = data.ClientHandle;
		Network.Connection connection = GetConnection(clientHandle);
		if (connection == null)
		{
			UnityEngine.Debug.LogError("[EAC] Status update for invalid client: " + clientHandle);
		}
		else
		{
			if (data.ClientAction != Epic.OnlineServices.AntiCheatCommon.AntiCheatCommonClientAction.RemovePlayer)
			{
				return;
			}
			Epic.OnlineServices.Utf8String actionReasonDetailsString = data.ActionReasonDetailsString;
			if (connection.IsDevelopmentBuild())
			{
				UnityEngine.Debug.LogWarning("[EAC] Remove player action skipped for unprotected client: " + connection.ToString());
				return;
			}
			UnityEngine.Debug.Log($"[EAC] Kicking {connection.userid} / {connection.username} ({actionReasonDetailsString})");
			connection.authStatusEAC = "eac";
			Network.Net.sv.Kick(connection, "EAC: " + actionReasonDetailsString);
			if (data.ActionReasonCode == Epic.OnlineServices.AntiCheatCommon.AntiCheatCommonClientActionReason.PermanentBanned || data.ActionReasonCode == Epic.OnlineServices.AntiCheatCommon.AntiCheatCommonClientActionReason.TemporaryBanned)
			{
				connection.authStatusEAC = "eacbanned";
				ConsoleNetwork.BroadcastToAllClients("chat.add", 2, 0, "<color=#fff>SERVER</color> Kicking " + connection.username + " (banned by anticheat)");
				if (data.ActionReasonCode == Epic.OnlineServices.AntiCheatCommon.AntiCheatCommonClientActionReason.PermanentBanned)
				{
					ConVar.Entity.DeleteBy(connection.userid);
				}
			}
			Epic.OnlineServices.AntiCheatServer.UnregisterClientOptions unregisterClientOptions = default(Epic.OnlineServices.AntiCheatServer.UnregisterClientOptions);
			unregisterClientOptions.ClientHandle = clientHandle;
			Epic.OnlineServices.AntiCheatServer.UnregisterClientOptions options = unregisterClientOptions;
			Interface.UnregisterClient(ref options);
			client2connection.TryRemove((uint)(int)clientHandle, out var _);
			connection2client.TryRemove(connection, out var _);
			connection2status.TryRemove(connection, out var _);
		}
	}
}

```
