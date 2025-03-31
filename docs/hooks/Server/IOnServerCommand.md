<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnServerCommand
```csharp
public static bool Internal(ConsoleSystem.Arg arg)
{
	if (arg.Invalid)
	{
		return false;
	}
	if (!arg.HasPermission())
	{
		arg.ReplyWith("You cannot run this command");
		return false;
	}
	try
	{
		using (TimeWarning.New("ConsoleSystem: " + arg.cmd.FullName))
		{
			arg.cmd.Call(arg);
		}
	}
	catch (System.Exception ex)
	{
		arg.ReplyWith("Error: " + arg.cmd.FullName + " - " + ex.Message + " (" + ex.Source + ")");
		UnityEngine.Debug.LogException(ex);
		return false;
	}
	if (arg.cmd.Variable && arg.cmd.GetOveride != null && string.IsNullOrWhiteSpace(arg.Reply))
	{
		string @string = arg.cmd.String;
		string text = (arg.cmd.Variable ? arg.cmd.String : "");
		if (!arg.Silent)
		{
			if (arg.Option.PrintValueOnly)
			{
				arg.ReplyWith(@string);
			}
			else if (text != @string)
			{
				arg.ReplyWith($"{arg.cmd.FullName}: changed from {Facepunch.Extend.StringExtensions.QuoteSafe(text)} to {Facepunch.Extend.StringExtensions.QuoteSafe(@string)}");
			}
			else
			{
				arg.ReplyWith($"{arg.cmd.FullName}: {Facepunch.Extend.StringExtensions.QuoteSafe(@string)}");
			}
		}
	}
	return true;
}

```
