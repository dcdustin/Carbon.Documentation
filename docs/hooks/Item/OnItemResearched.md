<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemResearched
Called when an item has been successfully researched.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemResearched()
{
	Puts("OnItemResearched has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ResearchTable]
public void ResearchAttemptFinished()
{
	Item targetItem = GetTargetItem();
	Item scrapItem = GetScrapItem();
	if (targetItem != null && scrapItem != null)
	{
		int num = ScrapForResearch(targetItem);
		if (scrapItem.amount >= num)
		{
			if (scrapItem.amount == num)
			{
				base.inventory.Remove(scrapItem);
				scrapItem.RemoveFromContainer();
				scrapItem.Remove();
			}
			else
			{
				scrapItem.UseItem(num);
			}
			base.inventory.Remove(targetItem);
			targetItem.Remove();
			Item item = ItemManager.Create(ItemManager.blueprintBaseDef, 1, 0uL);
			if (base.LastLootedByPlayer != null)
			{
				item.SetItemOwnership(base.LastLootedByPlayer, ItemOwnershipPhrases.ResearchTable);
			}
			item.blueprintTarget = ((targetItem.info.isRedirectOf != null) ? targetItem.info.isRedirectOf.itemid : targetItem.info.itemid);
			if (!item.MoveToContainer(base.inventory, 0))
			{
				item.Drop(GetDropPosition(), GetDropVelocity());
			}
			if (researchSuccessEffect.isValid)
			{
				Effect.server.Run(researchSuccessEffect.resourcePath, this, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
			}
		}
	}
	SendNetworkUpdateImmediate();
	if (user != null)
	{
		user.inventory.loot.SendImmediate();
	}
	EndResearch();
}

```
:::
