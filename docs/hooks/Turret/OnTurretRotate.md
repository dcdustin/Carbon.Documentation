<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTurretRotate
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void FlipAim(BaseEntity.RPCMessage rpc)
{
	if (!IsOnline() && IsAuthed(rpc.player) && !booting)
	{
		base.transform.rotation = UnityEngine.Quaternion.LookRotation(-base.transform.forward, base.transform.up);
		SendNetworkUpdate();
	}
}

```
