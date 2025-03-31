<Badge type="danger" text="Carbon Compatible"/>
# ICraftDurationMultiplier
```csharp
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
