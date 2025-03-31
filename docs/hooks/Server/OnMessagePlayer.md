<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMessagePlayer
Triggered when the server sends a chat message to a specific player.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnMessagePlayer()
{
	Puts("OnMessagePlayer has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void ChatMessage(string msg)
{
	if (base.isServer)
	{
		SendConsoleCommand("chat.add", 2, 0, msg);
	}
}

```
:::
