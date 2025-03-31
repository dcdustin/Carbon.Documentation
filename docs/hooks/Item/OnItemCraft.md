<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemCraft
```csharp
public bool CraftItem(ItemBlueprint bp, BasePlayer owner, ProtoBuf.Item.InstanceData instanceData = null, int amount = 1, int skinID = 0, Item fromTempBlueprint = null, bool free = false)
{
	if (owner != null && owner.IsTransferring())
	{
		return false;
	}
	if (!CanCraft(bp, amount, free))
	{
		return false;
	}
	taskUID++;
	ItemCraftTask itemCraftTask = Facepunch.Pool.Get<ItemCraftTask>();
	itemCraftTask.blueprint = bp;
	if (!free)
	{
		CollectIngredients(bp, itemCraftTask, amount, owner);
	}
	itemCraftTask.endTime = 0f;
	itemCraftTask.taskUID = taskUID;
	itemCraftTask.instanceData = instanceData;
	if (itemCraftTask.instanceData != null)
	{
		itemCraftTask.instanceData.ShouldPool = false;
	}
	itemCraftTask.amount = amount;
	itemCraftTask.skinID = skinID;
	if (fromTempBlueprint != null && itemCraftTask.takenItems != null)
	{
		fromTempBlueprint.RemoveFromContainer();
		itemCraftTask.takenItems.Add(fromTempBlueprint);
		itemCraftTask.conditionScale = 0.5f;
	}
	queue.AddLast(itemCraftTask);
	if (owner != null)
	{
		owner.Command("note.craft_add", itemCraftTask.taskUID, itemCraftTask.blueprint.targetItem.itemid, amount, itemCraftTask.skinID);
	}
	return true;
}

```
