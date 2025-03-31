<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnRunCommandLine
Called when a server command-line command is executed (during startup or via console input).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object IOnRunCommandLine()
{
	Puts("IOnRunCommandLine has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Facepunch.Console @ ConsoleSystem]
public static void UpdateValuesFromCommandLine()
{
	foreach (System.Collections.Generic.KeyValuePair<string, string> @switch in Facepunch.CommandLine.GetSwitches())
	{
		string text = @switch.Value;
		if (text == "")
		{
			text = "1";
		}
		string strCommand = @switch.Key.Substring(1);
		Run(ConsoleSystem.Option.Unrestricted, strCommand, text);
	}
}

```
:::
