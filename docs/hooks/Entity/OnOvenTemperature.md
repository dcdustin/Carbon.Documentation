<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnOvenTemperature
Called when an oven or furnace updates its internal temperature.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private float OnOvenTemperature()
{
	Puts("OnOvenTemperature has been fired!");
	return (System.Single)default;
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
