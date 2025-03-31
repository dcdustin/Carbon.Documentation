# OnEngineStatsRefresh
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEngineStatsRefresh()
{
	Puts("OnEngineStatsRefresh has been fired!");
	return (System.Object)default;
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
