# OnCoalingTowerStart
<Badge type="info" text="Resource"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a coaling tower unloading process is initiated (player tries to unload a train wagon).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCoalingTowerStart(CoalingTower coalingTower, BasePlayer player)
{
	Puts("OnCoalingTowerStart has been fired!");
	return (object)default;
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
