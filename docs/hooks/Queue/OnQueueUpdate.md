<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnQueueUpdate
```csharp
public void SendQueueUpdate(Network.Connection c, int position)
{
	Network.NetWrite netWrite = Network.Net.sv.StartWrite();
	netWrite.PacketID(Network.Message.Type.QueueUpdate);
	netWrite.UInt16((ushort)Queued);
	netWrite.UInt16((ushort)position);
	netWrite.Send(new Network.SendInfo(c));
}

```
