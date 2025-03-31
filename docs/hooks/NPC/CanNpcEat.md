<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanNpcEat [BaseNpc]
```csharp
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
