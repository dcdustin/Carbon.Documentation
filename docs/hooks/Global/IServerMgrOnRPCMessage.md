<Badge type="danger" text="Carbon Compatible"/>
# IServerMgrOnRPCMessage
```csharp
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
