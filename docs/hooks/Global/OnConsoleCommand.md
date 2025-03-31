# OnConsoleCommand
<Badge type="info" text="Global"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)<Badge type="info" text="Static"/><Badge type="info" text=" IgnoreChecksum"/>
Called when a console command is executed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnConsoleCommand()
{
	Puts("OnConsoleCommand has been fired!");
}
```
```csharp [Source — Facepunch.Console @ ConsoleSystem]
public static string Run(ConsoleSystem.Option options, string strCommand, params object[] args)
{
	LastError = null;
	string text = BuildCommand(strCommand, args);
	ConsoleSystem.Arg arg = new ConsoleSystem.Arg(options, text);
	bool flag = arg.HasPermission();
	if (!arg.Invalid && flag)
	{
		ConsoleSystem.Arg currentArgs = CurrentArgs;
		CurrentArgs = arg;
		bool flag2 = Internal(arg);
		CurrentArgs = currentArgs;
		if (options.PrintOutput && flag2 && arg.Reply != null && arg.Reply.Length > 0)
		{
			UnityEngine.DebugEx.Log(arg.Reply);
		}
		return arg.Reply;
	}
	LastError = "Command not found";
	if (!flag)
	{
		LastError = "Permission denied";
	}
	if (!options.IsServer && (!options.ForwardtoServerOnMissing || !SendToServer(text)))
	{
		LastError = "Command '" + strCommand + "' not found";
		if (options.PrintOutput && !ignoredCommands.Contains(strCommand))
		{
			UnityEngine.DebugEx.Log(LastError);
		}
		return null;
	}
	if (options.IsServer && options.PrintOutput)
	{
		LastError = "Command '" + strCommand + "' not found";
		if (!ignoredCommands.Contains(strCommand))
		{
			UnityEngine.DebugEx.Log(LastError);
		}
	}
	return null;
}

```
:::
