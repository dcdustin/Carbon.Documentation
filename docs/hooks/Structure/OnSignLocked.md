<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSignLocked [PhotoFrame]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void LockSign(BaseEntity.RPCMessage msg)
{
	if (msg.player.CanInteract() && CanUpdateSign(msg.player))
	{
		SetFlag(BaseEntity.Flags.Locked, b: true);
		SendNetworkUpdate();
		base.OwnerID = msg.player.userID;
	}
}

```
