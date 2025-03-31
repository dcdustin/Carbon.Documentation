<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTurretAuthorize
Called when a player is authorized on a turret.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTurretAuthorize()
{
	Puts("OnTurretAuthorize has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ AutoTurret]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void AddSelfAuthorize(BaseEntity.RPCMessage rpc)
{
	AddSelfAuthorize(rpc.player);
}

```
:::
