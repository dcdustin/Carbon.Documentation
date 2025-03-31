# OnPlayerWantsDismount
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player attempts to dismount a mountable entity (before actually dismounting).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerWantsDismount(BasePlayer local0, BaseMountable baseMountable)
{
	Puts("OnPlayerWantsDismount has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseMountable]
[BaseEntity.RPC_Server]
public void RPC_WantsDismount(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (HasValidDismountPosition(player) && (!(player != null) || !player.IsRestrained))
	{
		AttemptDismount(player);
	}
}

```
:::
