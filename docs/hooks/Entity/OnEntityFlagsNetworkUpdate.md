<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityFlagsNetworkUpdate
```csharp
public void SendNetworkUpdate_Flags()
{
	if (Rust.Application.isLoading || Rust.Application.isLoadingSave || base.IsDestroyed || net == null || !isSpawned)
	{
		return;
	}
	using (TimeWarning.New("SendNetworkUpdate_Flags"))
	{
		LogEntry(RustLog.EntryType.Network, 3, "SendNetworkUpdate_Flags");
		System.Collections.Generic.List<Network.Connection> subscribers = GetSubscribers();
		if (subscribers != null && subscribers.Count > 0)
		{
			SendDemoTransientEntity();
			Network.NetWrite netWrite = Network.Net.sv.StartWrite();
			netWrite.PacketID(Network.Message.Type.EntityFlags);
			netWrite.EntityID(net.ID);
			netWrite.Int32((int)flags);
			Network.SendInfo info = new Network.SendInfo(subscribers);
			netWrite.Send(info);
		}
		base.gameObject.SendOnSendNetworkUpdate(this);
	}
}

```
