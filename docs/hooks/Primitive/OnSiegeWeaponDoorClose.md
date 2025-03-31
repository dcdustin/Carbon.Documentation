# OnSiegeWeaponDoorClose
<Badge type="info" text="Primitive"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Triggered when a battering ram's door or cover is closed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSiegeWeaponDoorClose(BatteringRam batteringRam, BasePlayer player)
{
	Puts("OnSiegeWeaponDoorClose has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BatteringRam]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_CloseDoor(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract(usableWhileCrawling: true) && CanCloseDoor())
	{
		CloseDoor();
	}
}

```
:::
