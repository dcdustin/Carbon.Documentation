<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerWantsMount
```csharp
public void WantsMount(BasePlayer player)
{
	if (!player.IsValid() || !player.CanInteract())
	{
		return;
	}
	if (!DirectlyMountable())
	{
		BaseVehicle baseVehicle = VehicleParent();
		if (baseVehicle != null)
		{
			baseVehicle.WantsMount(player);
			return;
		}
	}
	AttemptMount(player);
}

```
