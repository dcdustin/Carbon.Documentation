<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMessagePlayer
```csharp
public void ChatMessage(string msg)
{
	if (base.isServer)
	{
		SendConsoleCommand("chat.add", 2, 0, msg);
	}
}

```
