<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEngineStatsRefresh
```csharp
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
