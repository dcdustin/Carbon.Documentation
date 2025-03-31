<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntitySnapshot [BasePlayer]
```csharp
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
