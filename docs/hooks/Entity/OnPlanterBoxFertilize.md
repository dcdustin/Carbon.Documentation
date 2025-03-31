# OnPlanterBoxFertilize
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a planter box is fertilized by a player (fertilizer added to the planter).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlanterBoxFertilize(PlanterBox planterBox)
{
	Puts("OnPlanterBoxFertilize has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ PlanterBox]
public void FertilizeGrowables()
{
	int num = GetFertilizerCount();
	if (num <= 0)
	{
		return;
	}
	foreach (BaseEntity child in children)
	{
		if (child == null)
		{
			continue;
		}
		GrowableEntity growableEntity = child as GrowableEntity;
		if (!(growableEntity == null) && !growableEntity.Fertilized && ConsumeFertilizer())
		{
			growableEntity.Fertilize();
			num--;
			if (num == 0)
			{
				break;
			}
		}
	}
}

```
:::
