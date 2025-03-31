# OnServerCommand
<Badge type="info" text="Server"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a server console command is executed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnServerCommand(ConsoleSystem.Arg arg)
{
	Puts("OnServerCommand has been fired!");
	return (bool)default;
}
```
:::
