<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnQueueUpdate
Called when a queued player's position update is sent (queue position message).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnQueueUpdate()
{
	Puts("OnQueueUpdate has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ConnectionQueue]
public void SendQueueUpdate(Network.Connection c, int position)
{
	Network.NetWrite netWrite = Network.Net.sv.StartWrite();
	netWrite.PacketID(Network.Message.Type.QueueUpdate);
	netWrite.UInt16((ushort)Queued);
	netWrite.UInt16((ushort)position);
	netWrite.Send(new Network.SendInfo(c));
}

```
:::
