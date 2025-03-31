# OnSprayRemove
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a spray decal (graffiti) is removed/cleaned.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSprayRemove(SprayCanSpray sprayCanSpray, BasePlayer local0)
{
	Puts("OnSprayRemove has been fired!");
	return (object)default;
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
