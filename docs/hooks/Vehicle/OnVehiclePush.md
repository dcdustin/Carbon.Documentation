# OnVehiclePush
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnVehiclePush(BaseVehicle baseVehicle, BasePlayer player)
{
	Puts("OnVehiclePush has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseVehicle]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(5f)]
public void RPC_WantsPush(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!player.isMounted && !RecentlyPushed && CanPushNow(player) && !(rigidBody == null) && (!OnlyOwnerAccessible() || !(player != creatorEntity)))
	{
		player.metabolism.calories.Subtract(3f);
		player.metabolism.SendChangesToClient();
		if (rigidBody.IsSleeping())
		{
			rigidBody.WakeUp();
		}
		DoPushAction(player);
		timeSinceLastPush = 0f;
	}
}

```
:::
