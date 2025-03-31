# OnVehicleHornPressed
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnVehicleHornPressed(VehicleModuleSeating vehicleModuleSeating, BasePlayer player)
{
	Puts("OnVehicleHornPressed has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ VehicleModuleSeating]
public override void PlayerServerInput(InputState inputState, BasePlayer player)
{
	base.PlayerServerInput(inputState, player);
	if (hornLoop != null && IsOnThisModule(player))
	{
		bool flag = inputState.IsDown(BUTTON.FIRE_PRIMARY);
		if (flag != HasFlag(BaseEntity.Flags.Reserved8))
		{
			SetFlag(BaseEntity.Flags.Reserved8, flag);
		}
		if (flag)
		{
			hornPlayer = player;
		}
	}
}

```
:::
