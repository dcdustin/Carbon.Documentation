<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBookmarkDelete
```csharp
[BaseEntity.RPC_Server]
public void DeleteBookmark(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!IsPlayerAdmin(player) || isStatic)
	{
		return;
	}
	string text = msg.read.String();
	if (IsValidIdentifier(text) && controlBookmarks.Contains(text))
	{
		controlBookmarks.Remove(text);
		SendControlBookmarks(player);
		BaseEntity baseEntity = currentlyControllingEnt.Get(serverside: true);
		if (baseEntity != null && baseEntity.TryGetComponent<IRemoteControllable>(out var component) && component.GetIdentifier() == text)
		{
			StopControl(player);
		}
	}
}

```
