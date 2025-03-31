<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBookmarksSendControl
```csharp
public void SendControlBookmarks(BasePlayer player)
{
	if (!(player == null))
	{
		string arg = GenerateControlBookmarkString();
		ClientRPC(RpcTarget.Player("ReceiveBookmarks", player), arg);
	}
}

```
