<Badge type="danger" text="Carbon Compatible"/>
# IServerMgrOnRPCMessage
Called when the server manager processes an RPC message.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IServerMgrOnRPCMessage()
{
	Puts("IServerMgrOnRPCMessage has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ServerMgr]
public void OnRPCMessage(Network.Message packet)
{
	timer.Restart();
	NetworkableId uid = packet.read.EntityID();
	uint num = packet.read.UInt32();
	if (ConVar.Server.rpclog_enabled)
	{
		rpcHistory.Increment(num);
	}
	BaseEntity baseEntity = BaseNetworkable.serverEntities.Find(uid) as BaseEntity;
	if (!(baseEntity == null))
	{
		baseEntity.SendDemoTransientEntity();
		baseEntity.SV_RPCMessage(num, packet);
		if (timer.Elapsed > Facepunch.Rust.Profiling.RuntimeProfiler.RpcWarningThreshold)
		{
			Facepunch.Rust.Profiling.LagSpikeProfiler.RPC(timer.Elapsed, packet, baseEntity, num);
		}
	}
}

```
:::
