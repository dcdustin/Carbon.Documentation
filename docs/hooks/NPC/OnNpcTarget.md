# OnNpcTarget
<Badge type="info" text="NPC"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an NPC selects a target to attack.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcTarget()
{
	Puts("OnNpcTarget has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ AIBrainSenses]
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
:::
