# CanCheckFuel
<Badge type="info" text="Fuel"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Determines if a player or entity can check a fuel container (is in range to check fuel).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanCheckFuel(EntityFuelSystem entityFuelSystem, StorageContainer local0, BasePlayer player)
{
	Puts("CanCheckFuel has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ EntityFuelSystem]
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
:::
