<Badge type="danger" text="Carbon Compatible"/>
# IConsoleUpdate
Called when the server console input is updated (each frame).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IConsoleUpdate()
{
	Puts("IConsoleUpdate has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Windows.ConsoleInput]
public void Update()
{
	if (!valid)
	{
		return;
	}
	if (nextUpdate < UnityEngine.Time.realtimeSinceStartup)
	{
		RedrawInputLine();
		nextUpdate = UnityEngine.Time.realtimeSinceStartup + 0.5f;
	}
	try
	{
		if (!System.Console.KeyAvailable)
		{
			return;
		}
	}
	catch (System.Exception)
	{
		return;
	}
	System.ConsoleKeyInfo consoleKeyInfo = System.Console.ReadKey();
	if (consoleKeyInfo.Key == System.ConsoleKey.Enter)
	{
		OnEnter();
	}
	else if (consoleKeyInfo.Key == System.ConsoleKey.Backspace)
	{
		OnBackspace();
	}
	else if (consoleKeyInfo.Key == System.ConsoleKey.Escape)
	{
		OnEscape();
	}
	else if (consoleKeyInfo.KeyChar != 0)
	{
		inputString += consoleKeyInfo.KeyChar;
		RedrawInputLine();
	}
}

```
:::
