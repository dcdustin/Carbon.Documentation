<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBookmarkAdd
```csharp
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
