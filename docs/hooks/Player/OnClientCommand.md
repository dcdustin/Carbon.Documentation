# OnClientCommand
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Triggered when a client sends a console command to the server.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnClientCommand(Network.Connection connection, string local0)
{
	Puts("OnClientCommand has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ConsoleNetwork]
public static void OnClientCommand(Network.Message packet)
{
	if (packet.read.Unread > ConVar.Server.maxpacketsize_command)
	{
		UnityEngine.Debug.LogWarning("Dropping client command due to size");
		return;
	}
	timer.Restart();
	string text = packet.read.StringRaw();
	if (packet.connection == null || !packet.connection.connected)
	{
		UnityEngine.Debug.LogWarning("Client without connection tried to run command: " + text);
		return;
	}
	string text2 = ConsoleSystem.Run(ConsoleSystem.Option.Server.FromConnection(packet.connection).Quiet(), text);
	if (!string.IsNullOrEmpty(text2))
	{
		SendClientReply(packet.connection, text2);
	}
	if (timer.Elapsed > Facepunch.Rust.Profiling.RuntimeProfiler.ConsoleCommandWarningThreshold)
	{
		Facepunch.Rust.Profiling.LagSpikeProfiler.ConsoleCommand(timer.Elapsed, packet, text);
	}
}

```
:::
