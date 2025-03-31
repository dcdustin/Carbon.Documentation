# OnCoalingTowerStart
<Badge type="info" text="Resource"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a coaling tower unloading process is initiated (player tries to unload a train wagon).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCoalingTowerStart()
{
	Puts("OnCoalingTowerStart has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ CoalingTower]
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
:::
