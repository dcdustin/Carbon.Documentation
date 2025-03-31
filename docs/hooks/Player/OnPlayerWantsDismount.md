<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerWantsDismount
```csharp
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
