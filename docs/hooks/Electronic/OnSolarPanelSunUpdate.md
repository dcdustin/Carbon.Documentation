<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSolarPanelSunUpdate
```csharp
public void SunUpdate()
{
	int num = currentEnergy;
	if (TOD_Sky.Instance.IsNight)
	{
		num = 0;
	}
	else
	{
		UnityEngine.Vector3 sunDirection = TOD_Sky.Instance.SunDirection;
		float value = UnityEngine.Vector3.Dot(sunSampler.forward, sunDirection);
		float num2 = UnityEngine.Mathf.InverseLerp(dot_minimum, dot_maximum, value);
		if (num2 > 0f && !IsVisible(sunSampler.position + sunDirection * 100f, 101f))
		{
			num2 = 0f;
		}
		num = UnityEngine.Mathf.FloorToInt((float)maximalPowerOutput * num2 * base.healthFraction);
	}
	bool num3 = currentEnergy != num;
	currentEnergy = num;
	if (num3)
	{
		MarkDirty();
	}
}

```
