<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnPlayerBanned [Publisher/VAC]
```csharp
public void OnValidateAuthTicketResponse(ulong SteamId, ulong OwnerId, AuthResponse Status)
{
	if (Auth_Steam.ValidateConnecting(SteamId, OwnerId, Status))
	{
		return;
	}
	Network.Connection connection = System.Linq.Enumerable.FirstOrDefault(Network.Net.sv.connections, (Network.Connection x) => x.userid == SteamId);
	if (connection == null)
	{
		UnityEngine.Debug.LogWarning($"Steam gave us a {Status} ticket response for unconnected id {SteamId}");
		return;
	}
	switch (Status)
	{
	case AuthResponse.OK:
		UnityEngine.Debug.LogWarning($"Steam gave us a 'ok' ticket response for already connected id {SteamId}");
		return;
	case AuthResponse.TimedOut:
		return;
	case AuthResponse.VACBanned:
	case AuthResponse.PublisherBanned:
		if (!bannedPlayerNotices.Contains(SteamId))
		{
			ConsoleNetwork.BroadcastToAllClients("chat.add", 2, 0, "<color=#fff>SERVER</color> Kicking " + UnityEngine.StringEx.EscapeRichText(connection.username) + " (banned by anticheat)");
			bannedPlayerNotices.Add(SteamId);
		}
		break;
	}
	UnityEngine.Debug.Log($"Kicking {connection.ipaddress}/{connection.userid}/{connection.username} (Steam Status \"{Status.ToString()}\")");
	connection.authStatusSteam = Status.ToString();
	Network.Net.sv.Kick(connection, "Steam: " + Status);
}

```
