<Badge type="danger" text="Carbon Compatible"/>
# IConsoleEnter
Called when a line is entered into the server console input.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IConsoleEnter()
{
	Puts("IConsoleEnter has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Windows.ConsoleInput]
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
:::
