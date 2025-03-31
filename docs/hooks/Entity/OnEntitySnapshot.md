<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntitySnapshot
Called when an entity snapshot is sent to a player (when a player first receives data about an entity on entering the network range).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEntitySnapshot()
{
	Puts("OnEntitySnapshot has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void SendEntitySnapshot(BaseNetworkable ent)
{
	using (TimeWarning.New("SendEntitySnapshot"))
	{
		if (!(ent == null) && ent.net != null && ent.ShouldNetworkTo(this))
		{
			Network.NetWrite netWrite = Network.Net.sv.StartWrite();
			net.connection.validate.entityUpdates++;
			BaseNetworkable.SaveInfo saveInfo = default(BaseNetworkable.SaveInfo);
			saveInfo.forConnection = net.connection;
			saveInfo.forDisk = false;
			BaseNetworkable.SaveInfo saveInfo2 = saveInfo;
			netWrite.PacketID(Network.Message.Type.Entities);
			netWrite.UInt32(net.connection.validate.entityUpdates);
			ent.ToStreamForNetwork(netWrite, saveInfo2);
			netWrite.Send(new Network.SendInfo(net.connection));
		}
	}
}

```
:::
