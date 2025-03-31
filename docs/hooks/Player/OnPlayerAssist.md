<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerAssist
```csharp
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
