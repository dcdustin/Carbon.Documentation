<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnWildlifeTrap [SurvivalFishTrap]
```csharp
public override void TrapThink()
{
	ItemDefinition itemDefinition = null;
	Item item = null;
	int usedLureAmount = 0;
	using (System.Collections.Generic.List<Item>.Enumerator enumerator = base.inventory.itemList.GetEnumerator())
	{
		if (enumerator.MoveNext())
		{
			Item current = enumerator.Current;
			if ((current.info.TryGetComponent<ItemModCompostable>(out var component) ? component.BaitValue : 0f) > 0f)
			{
				item = current;
				itemDefinition = FishLookup.Instance.GetFish(base.transform.position, cachedWaterBody, current, out var _, current.info.GetComponent<ItemModFishable>(), out usedLureAmount, 5f);
			}
		}
	}
	item?.UseItem(usedLureAmount);
	if (UnityEngine.Random.Range(0f, 1f) <= trapSuccessRate || !(itemDefinition != null))
	{
		return;
	}
	try
	{
		bypassItemFilter = true;
		Item item2 = ItemManager.Create(itemDefinition, 1, 0uL);
		if (base.LastLootedByPlayer != null)
		{
			item2.SetItemOwnership(base.LastLootedByPlayer, ItemOwnershipPhrases.SurvivalTrap);
		}
		if (!item2.MoveToContainer(base.inventory))
		{
			item2.Drop(base.transform.position, UnityEngine.Vector3.zero, UnityEngine.Quaternion.identity);
		}
		OnTrappedWildlife(setFlag: true);
	}
	finally
	{
		bypassItemFilter = false;
	}
}

```
