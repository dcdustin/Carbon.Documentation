# OnClientAuth
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a client is in the process of authenticating (during connection handshake).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnClientAuth(Network.Connection connection)
{
	Puts("OnClientAuth has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ServerMgr]
public void OnGiveUserInformation(Network.Message packet)
{
	if (packet.connection.state != 0)
	{
		Network.Net.sv.Kick(packet.connection, "Invalid connection state");
		return;
	}
	packet.connection.state = Network.Connection.State.Connecting;
	if (packet.read.UInt8() != 228)
	{
		Network.Net.sv.Kick(packet.connection, "Invalid Connection Protocol");
		return;
	}
	packet.connection.userid = packet.read.UInt64();
	packet.connection.protocol = packet.read.UInt32();
	packet.connection.os = packet.read.String(128);
	packet.connection.username = packet.read.String();
	if (string.IsNullOrEmpty(packet.connection.os))
	{
		throw new System.Exception("Invalid OS");
	}
	if (string.IsNullOrEmpty(packet.connection.username))
	{
		Network.Net.sv.Kick(packet.connection, "Invalid Username");
		return;
	}
	packet.connection.username = packet.connection.username.Replace('\n', ' ').Replace('\r', ' ').Replace('\t', ' ')
		.Trim();
	if (string.IsNullOrEmpty(packet.connection.username))
	{
		Network.Net.sv.Kick(packet.connection, "Invalid Username");
		return;
	}
	string text = string.Empty;
	string branch = ConVar.Server.branch;
	if (packet.read.Unread >= 4)
	{
		text = packet.read.String(128);
	}
	if (branch != string.Empty && branch != text)
	{
		UnityEngine.DebugEx.Log("Kicking " + packet.connection?.ToString() + " - their branch is '" + text + "' not '" + branch + "'");
		Network.Net.sv.Kick(packet.connection, "Wrong Steam Beta: Requires '" + branch + "' branch!");
	}
	else if (packet.connection.protocol > 2583)
	{
		UnityEngine.DebugEx.Log("Kicking " + packet.connection?.ToString() + " - their protocol is " + packet.connection.protocol + " not " + 2583);
		Network.Net.sv.Kick(packet.connection, "Wrong Connection Protocol: Server update required!");
	}
	else if (packet.connection.protocol < 2583)
	{
		UnityEngine.DebugEx.Log("Kicking " + packet.connection?.ToString() + " - their protocol is " + packet.connection.protocol + " not " + 2583);
		Network.Net.sv.Kick(packet.connection, "Wrong Connection Protocol: Client update required!");
	}
	else
	{
		packet.connection.token = packet.read.BytesWithSize(512u);
		if (packet.connection.token == null || packet.connection.token.Length < 1)
		{
			Network.Net.sv.Kick(packet.connection, "Invalid Token");
			return;
		}
		packet.connection.anticheatId = packet.read.StringRaw(128);
		packet.connection.anticheatToken = packet.read.StringRaw(2048);
		packet.connection.clientChangeset = packet.read.Int32();
		packet.connection.clientBuildTime = packet.read.Int64();
		auth.OnNewConnection(packet.connection);
	}
}

```
:::
