<Badge type="danger" text="Carbon Compatible"/>
# IConsoleEnter
```csharp
public void OnEnter()
{
	ClearLine(statusText.Length);
	System.Console.ForegroundColor = System.ConsoleColor.Green;
	System.Console.WriteLine("> " + inputString);
	string obj = inputString;
	inputString = "";
	if (this.OnInputText != null)
	{
		this.OnInputText(obj);
	}
	RedrawInputLine();
}

```
