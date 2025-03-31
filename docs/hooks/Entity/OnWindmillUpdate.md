# OnWindmillUpdate
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a Windmill updates its power generation based on wind (calculating output).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnWindmillUpdate(ElectricWindmill electricWindmill)
{
	Puts("OnWindmillUpdate has been fired!");
	return (object)default;
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
