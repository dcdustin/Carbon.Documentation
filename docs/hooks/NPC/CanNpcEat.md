# CanNpcEat
<Badge type="info" text="NPC"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Determines if an NPC can eat a target (like a corpse or food item).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanNpcEat()
{
	Puts("CanNpcEat has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseNpc]
public virtual bool WantsToEat(BaseEntity best)
{
	if (!best.HasTrait(BaseEntity.TraitFlag.Food))
	{
		return false;
	}
	if (best.HasTrait(BaseEntity.TraitFlag.Alive))
	{
		return false;
	}
	return true;
}

```
:::
