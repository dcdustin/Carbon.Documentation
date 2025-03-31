<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLiquidWeaponFiringStopped
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void StopFiring()
{
	CancelInvoke(FireTick);
	if (!RequiresPumping)
	{
		pressure = MaxPressure;
	}
	SetFlag(BaseEntity.Flags.On, b: false);
	if (base.isServer)
	{
		SendNetworkUpdateImmediate();
	}
}

```
