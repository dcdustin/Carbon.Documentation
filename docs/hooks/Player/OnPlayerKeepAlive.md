# OnPlayerKeepAlive
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player sends a keep-alive ping to the server.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerKeepAlive()
{
	Puts("OnPlayerKeepAlive has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_KeepAlive(BaseEntity.RPCMessage msg)
{
	if (msg.player.CanInteract() && !(msg.player == this) && IsWounded())
	{
		ProlongWounding(10f);
	}
}

```
:::
