# OnTurretAuthorize
<Badge type="info" text="Turret"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player is authorized on a turret.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTurretAuthorize(AutoTurret autoTurret, BasePlayer player)
{
	Puts("OnTurretAuthorize has been fired!");
	return (object)default;
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
