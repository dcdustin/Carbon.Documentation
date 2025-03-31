<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnRunCommandLine
```csharp
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
