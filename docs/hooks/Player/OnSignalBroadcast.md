<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSignalBroadcast
```csharp
public void SignalBroadcast(BaseEntity.Signal signal, string arg, Network.Connection sourceConnection = null)
{
	if (net != null && net.group != null)
	{
		ClientRPC(RpcTarget.NetworkGroup("SignalFromServerEx", this, Network.SendMethod.Unreliable, Network.Priority.Immediate), (int)signal, arg, sourceConnection?.userid ?? 0);
	}
}

```
