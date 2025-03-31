# OnUserKicked
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
Triggered when a user (player) is kicked from the server (generic user-level event).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserKicked(Oxide.Core.Libraries.Covalence.IPlayer player, string reason)
{
	Puts("OnUserKicked has been fired!");
}
```
:::
