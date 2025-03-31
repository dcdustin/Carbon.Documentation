# OnTurretRotate
<Badge type="info" text="Turret"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTurretRotate(AutoTurret autoTurret, BasePlayer player)
{
	Puts("OnTurretRotate has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ AutoTurret]
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
:::
