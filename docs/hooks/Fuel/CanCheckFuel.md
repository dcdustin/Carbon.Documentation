<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanCheckFuel
```csharp
public bool IsInFuelInteractionRange(BasePlayer player)
{
	StorageContainer fuelContainer = GetFuelContainer();
	if (fuelContainer != null)
	{
		float num = 0f;
		if (isServer)
		{
			num = 3f;
		}
		return fuelContainer.Distance(player.eyes.position) <= num;
	}
	return false;
}

```
