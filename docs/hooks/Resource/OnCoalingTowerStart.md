<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCoalingTowerStart
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_Unload(BaseEntity.RPCMessage msg)
{
	if (!TryUnloadActiveWagon(out var attemptStatus) && msg.player != null)
	{
		ClientRPC(RpcTarget.Player("ActionFailed", msg.player), (byte)attemptStatus, arg2: true);
	}
}

```
