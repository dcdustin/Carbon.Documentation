# OnGrowableGather
<Badge type="info" text="Resource"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player harvests a plant (picks fruit from a growable entity).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnGrowableGather(GrowableEntity growableEntity)
{
	Puts("OnGrowableGather has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ GrowableEntity]
public void PickFruit(BasePlayer player, bool eat = false)
{
	if (!CanPick())
	{
		return;
	}
	harvests++;
	GiveFruit(player, CurrentPickAmount, eat);
	RandomItemDispenser randomItemDispenser = PrefabAttribute.server.Find<RandomItemDispenser>(prefabID);
	if (randomItemDispenser != null)
	{
		randomItemDispenser.DistributeItems(player, base.transform.position);
	}
	ResetSeason();
	if (Properties.pickEffect.isValid)
	{
		Effect.server.Run(Properties.pickEffect.resourcePath, base.transform.position, UnityEngine.Vector3.up);
	}
	if (harvests >= Properties.maxHarvests)
	{
		if (Properties.disappearAfterHarvest)
		{
			TellPlanter();
			Die();
		}
		else
		{
			ChangeState(PlantProperties.State.Dying, resetAge: true);
		}
	}
	else
	{
		ChangeState(PlantProperties.State.Mature, resetAge: true);
	}
}

```
:::
