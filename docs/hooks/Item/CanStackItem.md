# CanStackItem
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Determines if two item stacks can be combined (stacked).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanStackItem(Item item, Item item)
{
	Puts("CanStackItem has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ Item]
public bool CanStack(Item item)
{
	if (item == this)
	{
		return false;
	}
	if (MaxStackable() <= 1)
	{
		return false;
	}
	if (item.info.stackable <= 1)
	{
		return false;
	}
	if (item.info.itemid != info.itemid)
	{
		return false;
	}
	if (hasCondition && condition != item.info.condition.max)
	{
		return false;
	}
	if (item.hasCondition && item.condition != item.info.condition.max)
	{
		return false;
	}
	if (!IsValid())
	{
		return false;
	}
	if (IsBlueprint() && blueprintTarget != item.blueprintTarget)
	{
		return false;
	}
	if (item.skin != skin)
	{
		return false;
	}
	if (item.info.amountType == ItemDefinition.AmountType.Genetics || info.amountType == ItemDefinition.AmountType.Genetics)
	{
		int num = ((item.instanceData != null) ? item.instanceData.dataInt : (-1));
		int num2 = ((instanceData != null) ? instanceData.dataInt : (-1));
		if (num != num2)
		{
			return false;
		}
	}
	if (item.instanceData != null && instanceData != null && (item.IsOn() != IsOn() || (item.instanceData.dataInt != instanceData.dataInt && item.info.Blueprint != null && item.info.Blueprint.GetWorkbenchLevel() == 3)))
	{
		return false;
	}
	if (instanceData != null && instanceData.subEntity.IsValid && (bool)info.GetComponent<ItemModSign>())
	{
		return false;
	}
	if (item.instanceData != null && item.instanceData.subEntity.IsValid && (bool)item.info.GetComponent<ItemModSign>())
	{
		return false;
	}
	if (item.instanceData != null && instanceData != null && item.info.TryGetComponent<ItemModFoodSpoiling>(out var component))
	{
		bool flag = false;
		float dataFloat = item.instanceData.dataFloat;
		float dataFloat2 = instanceData.dataFloat;
		if (UnityEngine.Mathf.Abs(dataFloat - dataFloat2) < ConVar.Server.maxFoodSpoilTimeDiffForItemStack)
		{
			flag = true;
		}
		float num3 = component.TotalSpoilTimeHours * 60f * 60f;
		float num4 = item.instanceData.dataFloat / num3;
		float num5 = instanceData.dataFloat / num3;
		if (num4 > ConVar.Server.normalisedFoodSpoilTimeStackThreshold && num5 > ConVar.Server.normalisedFoodSpoilTimeStackThreshold)
		{
			flag = true;
		}
		if (!flag)
		{
			return false;
		}
	}
	return true;
}

```
:::
