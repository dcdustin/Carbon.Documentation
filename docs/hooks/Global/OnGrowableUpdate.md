# OnGrowableUpdate
<Badge type="info" text="Global"/><Badge type="danger" text="Carbon Compatible"/>
Called each time a growable plant updates its growth (growth tick).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnGrowableUpdate()
{
	Puts("OnGrowableUpdate has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ GrowableEntity]
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
:::
