<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnOvenTemperature
```csharp
public float GetTemperature(int slot)
{
	if (!HasFlag(BaseEntity.Flags.On))
	{
		return 15f;
	}
	return cookingTemperature;
}

```
