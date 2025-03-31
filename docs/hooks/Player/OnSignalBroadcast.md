# OnSignalBroadcast
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an entity broadcasts a signal (e.g., sound or animation) to nearby players.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSignalBroadcast()
{
	Puts("OnSignalBroadcast has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseEntity]
public void SignalBroadcast(BaseEntity.Signal signal, string arg, Network.Connection sourceConnection = null)
{
	if (net != null && net.group != null)
	{
		ClientRPC(RpcTarget.NetworkGroup("SignalFromServerEx", this, Network.SendMethod.Unreliable, Network.Priority.Immediate), (int)signal, arg, sourceConnection?.userid ?? 0);
	}
}

```
:::
