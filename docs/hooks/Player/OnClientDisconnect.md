<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnClientDisconnect
```csharp
public void ReadDisconnectReason(Network.Message packet)
{
	string text = packet.read.String(4096);
	string text2 = packet.connection.ToString();
	if (!string.IsNullOrEmpty(text) && !string.IsNullOrEmpty(text2))
	{
		UnityEngine.DebugEx.Log(text2 + " disconnecting: " + text);
	}
}

```
