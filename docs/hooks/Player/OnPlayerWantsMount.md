# OnPlayerWantsMount
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player attempts to mount an entity (before mounting occurs).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerWantsMount(BasePlayer player, BaseMountable baseMountable)
{
	Puts("OnPlayerWantsMount has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseMountable]
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
:::
