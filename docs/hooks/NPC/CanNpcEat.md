# CanNpcEat
<Badge type="info" text="NPC"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Determines if an NPC can eat a target (like a corpse or food item).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanNpcEat(BaseNpc baseNpc)
{
	Puts("CanNpcEat has been fired!");
	return (bool)default;
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
