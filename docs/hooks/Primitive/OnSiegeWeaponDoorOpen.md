<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSiegeWeaponDoorOpen
Triggered when a battering ram's door or cover is opened.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSiegeWeaponDoorOpen()
{
	Puts("OnSiegeWeaponDoorOpen has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BatteringRam]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_OpenDoor(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract(usableWhileCrawling: true) && CanOpenDoor())
	{
		OpenDoor();
	}
}

```
:::
