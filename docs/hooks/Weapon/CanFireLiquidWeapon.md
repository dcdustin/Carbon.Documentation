<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanFireLiquidWeapon
```csharp
public bool CanFire(BasePlayer player)
{
	if (RequiresPumping && pressure < PressureLossPerTick)
	{
		return false;
	}
	if (player == null)
	{
		return false;
	}
	if (HasFlag(BaseEntity.Flags.Open))
	{
		return false;
	}
	if (AmountHeld() <= 0)
	{
		return false;
	}
	if (!player.CanInteract())
	{
		return false;
	}
	if (!player.CanAttack() || player.IsRunning())
	{
		return false;
	}
	Item item = GetItem();
	if (item == null || item.contents == null)
	{
		return false;
	}
	return true;
}

```
