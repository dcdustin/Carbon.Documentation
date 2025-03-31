# OnServerMessage
<Badge type="info" text="Server"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when the server broadcasts a chat message to all players (e.g., "SERVER" chat).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnServerMessage()
{
	Puts("OnServerMessage has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ConVar.Chat]
public static void Broadcast(string message, string username = "SERVER", string color = "#eee", ulong userid = 0uL)
{
	string text = UnityEngine.StringEx.EscapeRichText(username);
	ConsoleNetwork.BroadcastToAllClients("chat.add", 2, 0, "<color=" + color + ">" + text + "</color> " + message);
	ConVar.Chat.ChatEntry ce = default(ConVar.Chat.ChatEntry);
	ce.Channel = ConVar.Chat.ChatChannel.Server;
	ce.Message = message;
	ce.UserId = userid.ToString();
	ce.Username = username;
	ce.Color = color;
	ce.Time = Facepunch.Math.Epoch.Current;
	Record(ce);
}

```
:::
