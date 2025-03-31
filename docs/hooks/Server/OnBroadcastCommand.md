# OnBroadcastCommand
<Badge type="info" text="Server"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when the server broadcasts a console command to all connected clients.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBroadcastCommand(string strCommand, System.Object[] args)
{
	Puts("OnBroadcastCommand has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ConsoleNetwork]
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
:::
