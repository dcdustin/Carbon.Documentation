# OnBookmarkDelete
<Badge type="info" text="Bookmark"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a bookmark (saved camera/turret reference) is deleted at a Computer Station by an admin.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBookmarkDelete(ComputerStation computerStation, BasePlayer local0, string local1)
{
	Puts("OnBookmarkDelete has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ComputerStation]
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
:::
