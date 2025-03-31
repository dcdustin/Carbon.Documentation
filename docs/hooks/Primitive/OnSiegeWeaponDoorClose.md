<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSiegeWeaponDoorClose
Triggered when a battering ram's door or cover is closed.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSiegeWeaponDoorClose()
{
	Puts("OnSiegeWeaponDoorClose has been fired!");
	return (System.Object)default;
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
