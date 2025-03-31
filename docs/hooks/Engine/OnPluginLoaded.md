# OnPluginLoaded
<Badge type="info" text="Engine"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
Called when a plugin has been successfully loaded.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPluginLoaded(Oxide.Plugins.RustPlugin plugin)
{
	Puts("OnPluginLoaded has been fired!");
}
```
:::
