<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanCheckFuel
Determines if a player or entity can check a fuel container (is in range to check fuel).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanCheckFuel()
{
	Puts("CanCheckFuel has been fired!");
	return (System.Boolean)default;
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
