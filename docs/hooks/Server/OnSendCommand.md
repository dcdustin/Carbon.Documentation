<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSendCommand [list]
```csharp
public static void SendClientCommand(Network.Connection cn, string strCommand, params object[] args)
{
	if (Network.Net.sv.IsConnected())
	{
		Network.NetWrite netWrite = Network.Net.sv.StartWrite();
		netWrite.PacketID(Network.Message.Type.ConsoleCommand);
		string val = ConsoleSystem.BuildCommand(strCommand, args);
		netWrite.String(val);
		netWrite.Send(new Network.SendInfo(cn));
	}
}

```
