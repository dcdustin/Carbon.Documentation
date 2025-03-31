<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSprayRemove
Called when a spray decal (graffiti) is removed/cleaned.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSprayRemove()
{
	Puts("OnSprayRemove has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ SprayCanSpray]
[BaseEntity.RPC_Server]
public void Server_RequestWaterClear(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!(player == null) && Menu_WaterClear_ShowIf(player))
	{
		Kill();
	}
}

```
:::
