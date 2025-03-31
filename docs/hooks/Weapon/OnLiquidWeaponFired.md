<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLiquidWeaponFired
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void StartFiring(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (OnCooldown())
	{
		return;
	}
	if (!RequiresPumping)
	{
		pressure = MaxPressure;
	}
	if (CanFire(player))
	{
		CancelInvoke(FireTick);
		InvokeRepeating(FireTick, 0f, FireRate);
		SetFlag(BaseEntity.Flags.On, b: true);
		StartCooldown(FireRate);
		if (base.isServer)
		{
			SendNetworkUpdateImmediate();
		}
	}
}

```
