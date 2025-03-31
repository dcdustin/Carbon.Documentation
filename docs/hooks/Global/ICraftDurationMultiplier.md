<Badge type="danger" text="Carbon Compatible"/>
# ICraftDurationMultiplier
Allows modifying the duration of item crafting.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void ICraftDurationMultiplier()
{
	Puts("ICraftDurationMultiplier has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ItemCrafter]
public static float GetScaledDuration(ItemBlueprint bp, float workbenchLevel, bool isInTutorial)
{
	float num = workbenchLevel - (float)bp.GetWorkbenchLevel();
	if (isInTutorial)
	{
		return bp.GetCraftTime() * 0.25f;
	}
	if (num == 1f)
	{
		return bp.GetCraftTime() * 0.5f;
	}
	if (num >= 2f)
	{
		return bp.GetCraftTime() * 0.25f;
	}
	return bp.GetCraftTime();
}

```
:::
