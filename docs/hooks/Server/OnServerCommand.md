# OnServerCommand
<Badge type="info" text="Server"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
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
