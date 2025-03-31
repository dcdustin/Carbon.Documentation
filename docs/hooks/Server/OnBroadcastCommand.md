<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBroadcastCommand
```csharp
public static void BroadcastToAllClients(string strCommand, params object[] args)
{
	if (Network.Net.sv.IsConnected())
	{
		Network.NetWrite netWrite = Network.Net.sv.StartWrite();
		netWrite.PacketID(Network.Message.Type.ConsoleCommand);
		netWrite.String(ConsoleSystem.BuildCommand(strCommand, args));
		netWrite.Send(new Network.SendInfo(Network.Net.sv.connections));
	}
}

```
