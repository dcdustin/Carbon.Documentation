<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSiegeWeaponDoorClose [BatteringRam]
```csharp
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
