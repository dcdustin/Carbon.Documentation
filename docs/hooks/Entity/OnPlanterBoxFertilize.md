# OnPlanterBoxFertilize
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a planter box is fertilized by a player (fertilizer added to the planter).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlanterBoxFertilize()
{
	Puts("OnPlanterBoxFertilize has been fired!");
	return (System.Object)default;
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
