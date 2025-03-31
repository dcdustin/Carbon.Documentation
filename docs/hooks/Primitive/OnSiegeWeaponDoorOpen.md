<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSiegeWeaponDoorOpen [BatteringRam]
```csharp
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
