<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSiegeWeaponPull
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void SERVER_StartPulling(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (CanPullNow(player) && !(rigidBody == null) && (!OnlyOwnerAccessible() || !(player != creatorEntity)))
	{
		player.metabolism.calories.Subtract(3f);
		player.metabolism.SendChangesToClient();
		if (rigidBody.IsSleeping())
		{
			rigidBody.WakeUp();
		}
		StartPulling(player);
	}
}

```
