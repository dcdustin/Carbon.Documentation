# OnEngineStatsRefreshed
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnEngineStatsRefreshed(VehicleModuleEngine vehicleModuleEngine, Rust.Modular.EngineStorage engineStorage)
{
	Puts("OnEngineStatsRefreshed has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ VehicleModuleEngine]
public void RefreshPerformanceStats(Rust.Modular.EngineStorage engineStorage)
{
	if (engineStorage == null)
	{
		IsUsable = false;
		PerformanceFractionAcceleration = 0f;
		PerformanceFractionTopSpeed = 0f;
		PerformanceFractionFuelEconomy = 0f;
	}
	else
	{
		IsUsable = engineStorage.isUsable;
		PerformanceFractionAcceleration = GetPerformanceFraction(engineStorage.accelerationBoostPercent);
		PerformanceFractionTopSpeed = GetPerformanceFraction(engineStorage.topSpeedBoostPercent);
		PerformanceFractionFuelEconomy = GetPerformanceFraction(engineStorage.fuelEconomyBoostPercent);
	}
	OverallPerformanceFraction = (PerformanceFractionAcceleration + PerformanceFractionTopSpeed + PerformanceFractionFuelEconomy) / 3f;
}

```
:::
