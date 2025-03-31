# OnWindmillUpdated
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a Windmill’s power output has been updated.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnWindmillUpdated(ElectricWindmill electricWindmill)
{
	Puts("OnWindmillUpdated has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ElectricWindmill]
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
:::
