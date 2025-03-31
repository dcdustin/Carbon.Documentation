<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcTarget [AIBrainSenses]
```csharp
public BaseEntity GetNearest(System.Collections.Generic.List<BaseEntity> entities, float rangeFraction)
{
	if (entities == null || entities.Count == 0)
	{
		return null;
	}
	float num = float.PositiveInfinity;
	BaseEntity result = null;
	foreach (BaseEntity entity in entities)
	{
		if (!(entity == null) && !(entity.Health() <= 0f))
		{
			float num2 = UnityEngine.Vector3.Distance(entity.transform.position, owner.transform.position);
			if (num2 <= rangeFraction * maxRange && num2 < num)
			{
				result = entity;
			}
		}
	}
	return result;
}

```
