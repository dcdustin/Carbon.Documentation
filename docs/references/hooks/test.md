# OnBookmarkAdd
<Badge type="info" text="Bookmark"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a new camera bookmark is added at a Computer Station (admin adds a new remote camera identifier).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBookmarkAdd(ComputerStation computerStation, BasePlayer local0, string local1)
{
    Puts("OnBookmarkAdd has been fired!");
    return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ComputerStation]
[BaseEntity.RPC_Server]
public void AddBookmark(BaseEntity.RPCMessage msg)
{
    BasePlayer player = msg.player;
    if (IsPlayerAdmin(player) && !isStatic)
    {
        if (UnityEngine.Time.realtimeSinceStartup < nextAddTime)
        {
            player.ChatMessage("Slow down...");
            return;
        }
        if (controlBookmarks.Count >= 128)
        {
            player.ChatMessage("Too many bookmarks, delete some");
            return;
        }
        nextAddTime = UnityEngine.Time.realtimeSinceStartup + 1f;
        string identifier = msg.read.String();
        ForceAddBookmark(identifier);
        SendControlBookmarks(player);
    }
}

```
:::
