<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnExcavatorGather
Called when the excavator produces resources and deposits them (each processing cycle).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnExcavatorGather()
{
	Puts("OnExcavatorGather has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ExcavatorArm]
public void ProduceResources()
{
	float num = resourceProductionTickRate / timeForFullResources;
	float num2 = resourcesToMine[resourceMiningIndex].amount * num;
	pendingResources[resourceMiningIndex].amount += num2;
	ItemAmount[] array = pendingResources;
	foreach (ItemAmount itemAmount in array)
	{
		if (!(itemAmount.amount >= (float)outputPiles.Count))
		{
			continue;
		}
		int num3 = UnityEngine.Mathf.FloorToInt(itemAmount.amount / (float)outputPiles.Count);
		itemAmount.amount -= num3 * 2;
		foreach (ExcavatorOutputPile outputPile in outputPiles)
		{
			Item item = ItemManager.Create(resourcesToMine[resourceMiningIndex].itemDef, num3, 0uL);
			Facepunch.Rust.Analytics.Azure.OnExcavatorProduceItem(item, this);
			if (!item.MoveToContainer(outputPile.inventory))
			{
				item.Drop(outputPile.GetDropPosition(), outputPile.GetDropVelocity());
			}
		}
	}
}

```
:::
