# OnBookmarksSendControl
<Badge type="info" text="Bookmark"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when the server sends the list of available control bookmarks to a player (for example, when a player opens the Computer Station interface).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBookmarksSendControl(ComputerStation computerStation, BasePlayer player, string local0)
{
	Puts("OnBookmarksSendControl has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ComputerStation]
public void SendControlBookmarks(BasePlayer player)
{
	if (!(player == null))
	{
		string arg = GenerateControlBookmarkString();
		ClientRPC(RpcTarget.Player("ReceiveBookmarks", player), arg);
	}
}

```
:::
