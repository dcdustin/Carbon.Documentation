# OnEntityFlagsNetworkUpdate
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an entity’s networked flags are updated (for example, door opened/closed, light toggled, etc., sending state to clients).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEntityFlagsNetworkUpdate(BaseEntity baseEntity)
{
	Puts("OnEntityFlagsNetworkUpdate has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseEntity]
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
:::
