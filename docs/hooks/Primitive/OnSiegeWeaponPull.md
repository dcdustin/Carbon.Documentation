# OnSiegeWeaponPull
<Badge type="info" text="Primitive"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a siege weapon is pulled back into ready position (e.g., resetting a catapult or ram).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSiegeWeaponPull(BaseSiegeWeapon baseSiegeWeapon, BasePlayer player)
{
	Puts("OnSiegeWeaponPull has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseSiegeWeapon]
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
:::
