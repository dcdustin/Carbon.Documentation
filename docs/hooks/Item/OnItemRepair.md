# OnItemRepair
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an item is being repaired at a repair bench.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemRepair(BasePlayer player, Item itemToRepair)
{
	Puts("OnItemRepair has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ RepairBench]
public static void RepairAnItem(Item itemToRepair, BasePlayer player, BaseEntity repairBenchEntity, float maxConditionLostOnRepair, bool mustKnowBlueprint)
{
	if (itemToRepair == null)
	{
		return;
	}
	ItemDefinition info = itemToRepair.info;
	ItemBlueprint component = info.GetComponent<ItemBlueprint>();
	if (!component)
	{
		return;
	}
	ItemModRepair component2 = itemToRepair.info.GetComponent<ItemModRepair>();
	if (!info.condition.repairable || itemToRepair.condition == itemToRepair.maxCondition)
	{
		return;
	}
	if (mustKnowBlueprint)
	{
		ItemDefinition itemDefinition = ((info.isRedirectOf != null) ? info.isRedirectOf : info);
		if (!player.blueprints.HasUnlocked(itemDefinition) && (!(itemDefinition.Blueprint != null) || itemDefinition.Blueprint.isResearchable))
		{
			return;
		}
	}
	float num = RepairCostFraction(itemToRepair);
	bool flag = false;
	System.Collections.Generic.List<ItemAmount> obj = Facepunch.Pool.Get<System.Collections.Generic.List<ItemAmount>>();
	GetRepairCostList(component, obj);
	foreach (ItemAmount item in obj)
	{
		if (item.itemDef.category != ItemCategory.Component)
		{
			int amount = player.inventory.GetAmount(item.itemDef.itemid);
			if (UnityEngine.Mathf.CeilToInt(item.amount * num) > amount)
			{
				flag = true;
				break;
			}
		}
	}
	if (flag)
	{
		Facepunch.Pool.FreeUnmanaged(ref obj);
		return;
	}
	foreach (ItemAmount item2 in obj)
	{
		if (item2.itemDef.category != ItemCategory.Component)
		{
			int amount2 = UnityEngine.Mathf.CeilToInt(item2.amount * num);
			player.inventory.Take(null, item2.itemid, amount2);
			Facepunch.Rust.Analytics.Azure.LogResource(Facepunch.Rust.Analytics.Azure.ResourceMode.Consumed, "repair", item2.itemDef.shortname, amount2, repairBenchEntity, null, safezone: false, null, 0uL, null, itemToRepair);
		}
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
	float conditionNormalized = itemToRepair.conditionNormalized;
	float maxConditionNormalized = itemToRepair.maxConditionNormalized;
	itemToRepair.DoRepair(maxConditionLostOnRepair);
	Facepunch.Rust.Analytics.Azure.OnItemRepaired(player, repairBenchEntity, itemToRepair, conditionNormalized, maxConditionNormalized);
	if (ConVar.Global.developer > 0)
	{
		UnityEngine.Debug.Log("Item repaired! condition : " + itemToRepair.condition + "/" + itemToRepair.maxCondition);
	}
	string strName = "assets/bundled/prefabs/fx/repairbench/itemrepair.prefab";
	if (component2 != null && component2.successEffect?.Get() != null)
	{
		strName = component2.successEffect.resourcePath;
	}
	Effect.server.Run(strName, repairBenchEntity, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
}

```
:::
