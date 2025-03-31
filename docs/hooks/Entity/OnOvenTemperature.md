# OnOvenTemperature
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an oven or furnace updates its internal temperature.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private float OnOvenTemperature(BaseOven baseOven)
{
	Puts("OnOvenTemperature has been fired!");
	return (float)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseOven]
public float GetTemperature(int slot)
{
	if (!HasFlag(BaseEntity.Flags.On))
	{
		return 15f;
	}
	return cookingTemperature;
}

```
:::
