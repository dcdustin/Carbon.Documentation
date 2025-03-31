# OnNativeCommandHasPermission
<Badge type="info" text="Global"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)
Called when checking if a player has permission to run a native console command.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnNativeCommandHasPermission(ConsoleSystem.Arg arg)
{
	Puts("OnNativeCommandHasPermission has been fired!");
	return (bool)default;
}
```
:::
