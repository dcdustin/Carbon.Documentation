# OnUserConnected
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
Called when a user (player) connects to the server (generic user-level connect event).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserConnected(Oxide.Core.Libraries.Covalence.IPlayer player)
{
	Puts("OnUserConnected has been fired!");
}
```
:::
