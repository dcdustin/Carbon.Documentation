<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnServerMessage
```csharp
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
