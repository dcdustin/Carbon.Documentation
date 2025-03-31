<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLiquidWeaponFiringStopped
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnLiquidWeaponFiringStopped()
{
	Puts("OnLiquidWeaponFiringStopped has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ LiquidWeapon]
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
:::
