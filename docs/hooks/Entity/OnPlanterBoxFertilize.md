<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlanterBoxFertilize
```csharp
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
