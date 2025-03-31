<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTurretRotate
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTurretRotate()
{
	Puts("OnTurretRotate has been fired!");
	return (System.Object)default;
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
