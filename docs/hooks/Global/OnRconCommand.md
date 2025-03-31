# OnRconCommand
<Badge type="info" text="Global"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="Static"/><Badge type="info" text=" IgnoreChecksum"/>
Called when an RCON (remote console) command is received.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnRconCommand(System.Net.IPAddress ip, string command, System.String[] arguments)
{
	Puts("OnRconCommand has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Facepunch.RCon]
public static void OnCommand(Facepunch.RCon.Command cmd)
{
	try
	{
		responseIdentifier = cmd.Identifier;
		responseConnection = cmd.ConnectionId;
		isInput = true;
		if (Print)
		{
			UnityEngine.Debug.Log("[rcon] " + cmd.Ip?.ToString() + ": " + cmd.Message);
		}
		isInput = false;
		timer.Restart();
		string text = ConsoleSystem.Run(ConsoleSystem.Option.Server.Quiet().WithRconId(cmd.ConnectionId), cmd.Message);
		timer.Stop();
		System.TimeSpan elapsed = timer.Elapsed;
		if (Facepunch.Rust.Profiling.RconProfiler.mode > 0)
		{
			Facepunch.Rust.Profiling.RconProfiler.ExecutionTime += elapsed;
		}
		if (elapsed > Facepunch.Rust.Profiling.RuntimeProfiler.RconCommandWarningThreshold)
		{
			Facepunch.Rust.Profiling.LagSpikeProfiler.RconCommand(timer.Elapsed, cmd.Message);
		}
		if (text != null)
		{
			OnMessage(text, string.Empty, UnityEngine.LogType.Log);
		}
	}
	finally
	{
		responseIdentifier = 0;
		responseConnection = -1;
	}
}

```
:::
