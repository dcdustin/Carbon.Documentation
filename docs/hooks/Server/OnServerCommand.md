<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnServerCommand
Triggered when a server console command is executed.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnServerCommand()
{
	Puts("OnServerCommand has been fired!");
	return (System.Boolean)default;
}
```
:::
