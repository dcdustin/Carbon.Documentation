# CanSwapToSeat
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player tries to swap to another seat (for example, in a vehicle).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanSwapToSeat(BasePlayer player, ModularCarSeat modularCarSeat)
{
	Puts("CanSwapToSeat has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ ModularCarSeat]
public override bool CanSwapToThis(BasePlayer player)
{
	if (associatedSeatingModule.DoorsAreLockable)
	{
		ModularCar modularCar = associatedSeatingModule.Vehicle as ModularCar;
		if (modularCar != null)
		{
			return modularCar.PlayerCanUseThis(player, ModularCarCodeLock.LockType.Door);
		}
	}
	return true;
}

```
:::
