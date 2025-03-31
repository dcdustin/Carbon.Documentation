# OnItemCraftCancelled
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an item crafting job is canceled.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemCraftCancelled(ItemCraftTask local1, ItemCrafter itemCrafter)
{
	Puts("OnItemCraftCancelled has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ItemCrafter]
public bool CancelTask(int iID)
{
	if (queue.Count == 0)
	{
		return false;
	}
	if (owner != null && owner.IsTransferring())
	{
		return false;
	}
	ItemCraftTask itemCraftTask = System.Linq.Enumerable.FirstOrDefault(queue, (ItemCraftTask x) => x.taskUID == iID && !x.cancelled);
	if (itemCraftTask == null)
	{
		return false;
	}
	itemCraftTask.cancelled = true;
	if (owner == null)
	{
		return true;
	}
	owner.Command("note.craft_done", itemCraftTask.taskUID, 0);
	if (itemCraftTask.takenItems != null && itemCraftTask.takenItems.Count > 0)
	{
		foreach (Item takenItem in itemCraftTask.takenItems)
		{
			if (takenItem != null && takenItem.amount > 0)
			{
				if (takenItem.IsBlueprint() && takenItem.blueprintTargetDef == itemCraftTask.blueprint.targetItem)
				{
					takenItem.UseItem(itemCraftTask.numCrafted);
				}
				if (takenItem.amount > 0 && !takenItem.MoveToContainer(owner.inventory.containerMain))
				{
					takenItem.Drop(owner.inventory.containerMain.dropPosition + UnityEngine.Random.value * UnityEngine.Vector3.down + UnityEngine.Random.insideUnitSphere, owner.inventory.containerMain.dropVelocity);
					owner.Command("note.inv", takenItem.info.itemid, -takenItem.amount);
				}
			}
		}
		itemCraftTask.takenItems.Clear();
	}
	return true;
}

```
:::
