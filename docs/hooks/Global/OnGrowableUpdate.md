<Badge type="danger" text="Carbon Compatible"/>
# OnGrowableUpdate
```csharp
public void RunUpdate()
{
	if (!IsDead())
	{
		CalculateQualities(firstTime: false);
		float overallQuality = CalculateOverallQuality();
		float actualStageAgeIncrease = UpdateAge(overallQuality);
		UpdateHealthAndYield(overallQuality, actualStageAgeIncrease);
		if (base.health <= 0f)
		{
			TellPlanter();
			Die();
		}
		else
		{
			UpdateState();
			ConsumeWater();
			SendNetworkUpdate();
		}
	}
}

```
