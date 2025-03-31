<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerDisconnected
```csharp
public void OnDisconnected(string strReason, Network.Connection connection)
{
	Facepunch.Rust.Analytics.Azure.OnPlayerDisconnected(connection, strReason);
	GlobalNetworkHandler.server.OnClientDisconnected(connection);
	connectionQueue.TryAddReservedSlot(connection);
	connectionQueue.RemoveConnection(connection);
	ConnectionAuth.OnDisconnect(connection);
	if (connection.authStatusSteam == "ok")
	{
		PlatformService.Instance.EndPlayerSession(connection.userid);
	}
	EACServer.OnLeaveGame(connection);
	BasePlayer basePlayer = connection.player as BasePlayer;
	if (basePlayer != null)
	{
		basePlayer.OnDisconnected();
	}
	if (connection.authStatusNexus == "ok")
	{
		NexusServer.Logout(connection.userid);
	}
}

```
