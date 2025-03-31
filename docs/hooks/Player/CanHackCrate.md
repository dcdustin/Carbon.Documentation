<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanHackCrate
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_Hack(BaseEntity.RPCMessage msg)
{
	if (!IsBeingHacked())
	{
		Facepunch.Rust.Analytics.Azure.OnLockedCrateStarted(msg.player, this);
		originalHackerPlayerId = msg.player.userID;
		originalHackerPlayer = msg.player;
		StartHacking();
	}
}

```
