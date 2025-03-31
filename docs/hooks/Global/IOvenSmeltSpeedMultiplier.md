<Badge type="danger" text="Carbon Compatible"/>
# IOvenSmeltSpeedMultiplier
Allows modifying how fast ovens and furnaces smelt items.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IOvenSmeltSpeedMultiplier()
{
	Puts("IOvenSmeltSpeedMultiplier has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseOven]
public virtual void StartCooking()
{
	if (FindBurnable() != null || CanRunWithNoFuel)
	{
		base.inventory.temperature = cookingTemperature;
		UpdateAttachmentTemperature();
		InvokeRepeating(Cook, 0.5f, 0.5f);
		if (visualFood)
		{
			InvokeRepeating(CookVisuals, 0f, 0.05f);
		}
		SetFlag(BaseEntity.Flags.On, b: true);
		if (hasOpenFlame)
		{
			SingletonComponent<NpcFireManager>.Instance.Add(this);
		}
	}
}

```
:::
