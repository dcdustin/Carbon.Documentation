# OnSendCommand
<Badge type="info" text="Server"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when the server sends a console command to a specific client.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSendCommand(Network.Connection cn, string strCommand, System.Object[] args)
{
	Puts("OnSendCommand has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ConsoleNetwork]
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
:::
