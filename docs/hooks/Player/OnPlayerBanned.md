# OnPlayerBanned
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
- Called when a player is banned from the server.

- Called when Easy Anti-Cheat (EAC) bans a player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerBanned(Network.Connection connection, string reason)
{
	Puts("OnPlayerBanned has been fired!");
}
```
:::
