# OnItemCraftFinished
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an item crafting job finishes (item has been crafted).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemCraftFinished(ItemCraftTask task, Item local1, ItemCrafter itemCrafter)
{
	Puts("OnItemCraftFinished has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ItemCrafter]
public void FinishCrafting(ItemCraftTask task)
{
	task.amount--;
	task.numCrafted++;
	ulong skin = ItemDefinition.FindSkin(task.blueprint.targetItem.itemid, task.skinID);
	Item item2 = ItemManager.CreateByItemID(task.blueprint.targetItem.itemid, 1, skin);
	item2.amount = task.blueprint.amountToCreate;
	int amount = item2.amount;
	_ = owner.currentCraftLevel;
	bool inSafezone = owner.InSafeZone();
	if (item2.hasCondition && task.conditionScale != 1f)
	{
		item2.maxCondition *= task.conditionScale;
		item2.condition = item2.maxCondition;
	}
	item2.OnVirginSpawn(owner);
	item2.SetItemOwnership(owner, ItemOwnershipPhrases.CraftedPhrase);
	foreach (ItemAmount ingredient in task.blueprint.GetIngredients())
	{
		int num = (int)ingredient.amount;
		if (task.takenItems == null)
		{
			continue;
		}
		foreach (Item takenItem in task.takenItems)
		{
			if (takenItem.info == ingredient.itemDef)
			{
				int num2 = UnityEngine.Mathf.Min(takenItem.amount, num);
				Facepunch.Rust.Analytics.Azure.OnCraftMaterialConsumed(takenItem.info.shortname, num, base.baseEntity, task.workbenchEntity, inSafezone, item2.info.shortname);
				takenItem.UseItem(num);
				num -= num2;
			}
			if (num <= 0)
			{
				break;
			}
		}
	}
	task.takenItems?.RemoveAll((Item item) => item.amount == 0);
	Facepunch.Rust.Analytics.Server.Crafting(task.blueprint.targetItem.shortname, task.skinID);
	Facepunch.Rust.Analytics.Azure.OnCraftItem(item2.info.shortname, item2.amount, base.baseEntity, task.workbenchEntity, inSafezone);
	owner.Command("note.craft_done", task.taskUID, 1, task.amount);
	if (task.instanceData != null)
	{
		item2.instanceData = task.instanceData;
	}
	if (!string.IsNullOrEmpty(task.blueprint.UnlockAchievment))
	{
		owner.GiveAchievement(task.blueprint.UnlockAchievment);
	}
	owner.ProcessMissionEvent(BaseMission.MissionEventType.CRAFT_ITEM, item2.info.itemid, amount);
	if (owner.inventory.GiveItem(item2))
	{
		owner.Command("note.inv", item2.info.itemid, amount);
		return;
	}
	ItemContainer itemContainer = System.Linq.Enumerable.First(containers);
	owner.Command("note.inv", item2.info.itemid, amount);
	owner.Command("note.inv", item2.info.itemid, -item2.amount);
	item2.Drop(itemContainer.dropPosition, itemContainer.dropVelocity);
}

```
:::
