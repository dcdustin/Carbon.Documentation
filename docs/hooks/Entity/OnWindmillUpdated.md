<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnWindmillUpdated
```csharp
public void WindUpdate()
{
	serverWindSpeed = GetWindSpeedScale();
	if (!AmIVisible())
	{
		serverWindSpeed = 0f;
	}
	int num = UnityEngine.Mathf.FloorToInt((float)maxPowerGeneration * serverWindSpeed);
	bool num2 = currentEnergy != num;
	currentEnergy = num;
	if (num2)
	{
		MarkDirty();
	}
	SendNetworkUpdate();
}

```
