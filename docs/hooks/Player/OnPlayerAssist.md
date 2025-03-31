# OnPlayerAssist
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a wounded player is assisted by another player (revived from the wounded state).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerAssist()
{
	Puts("OnPlayerAssist has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_Assist(BaseEntity.RPCMessage msg)
{
	if (msg.player.CanInteract() && !(msg.player == this) && IsWounded())
	{
		StopWounded(msg.player);
		msg.player.stats.Add("wounded_assisted", 1, (Stats)5);
		stats.Add("wounded_healed", 1);
	}
}

```
:::
