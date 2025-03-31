<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanSwapToSeat [ModularCarSeat]
```csharp
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
