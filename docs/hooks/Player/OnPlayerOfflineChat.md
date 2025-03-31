# OnPlayerOfflineChat
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
Triggered when an offline chat message is processed (e.g., in offline or clan chat systems).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerOfflineChat(ulong playerid, string username, string message, ConVar.Chat.ChatChannel channel)
{
	Puts("OnPlayerOfflineChat has been fired!");
}
```
:::
