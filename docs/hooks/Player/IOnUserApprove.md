<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnUserApprove
```csharp
public void OnNewConnection(Network.Connection connection)
{
	connection.connected = false;
	if (connection.token == null || connection.token.Length < 32)
	{
		Reject(connection, "Invalid Token");
		return;
	}
	if (connection.userid == 0L)
	{
		Reject(connection, "Invalid SteamID");
		return;
	}
	if (connection.protocol != 2583)
	{
		if (!DeveloperList.Contains(connection.userid))
		{
			Reject(connection, "Incompatible Version");
			return;
		}
		UnityEngine.DebugEx.Log("Not kicking " + connection.userid + " for incompatible protocol (is a developer)");
	}
	if (ServerUsers.Is(connection.userid, ServerUsers.UserGroup.Banned))
	{
		ServerUsers.User user = ServerUsers.Get(connection.userid);
		string text = user?.notes ?? "no reason given";
		string text2 = ((user != null && user.expiry > 0) ? (" for " + Facepunch.Extend.NumberExtensions.FormatSecondsLong(user.expiry - Facepunch.Math.Epoch.Current)) : "");
		Reject(connection, "You are banned from this server" + text2 + " (" + text + ")");
		return;
	}
	if (ServerUsers.Is(connection.userid, ServerUsers.UserGroup.Moderator))
	{
		UnityEngine.DebugEx.Log(connection.ToString() + " has auth level 1");
		connection.authLevel = 1u;
	}
	if (ServerUsers.Is(connection.userid, ServerUsers.UserGroup.Owner))
	{
		UnityEngine.DebugEx.Log(connection.ToString() + " has auth level 2");
		connection.authLevel = 2u;
	}
	if (DeveloperList.Contains(connection.userid))
	{
		UnityEngine.DebugEx.Log(connection.ToString() + " is a developer");
		connection.authLevel = 3u;
	}
	m_AuthConnection.Add(connection);
	StartCoroutine(AuthorisationRoutine(connection));
}

```
