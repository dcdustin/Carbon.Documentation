# CanFastTrackCraftTask
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Determines if a crafting task can be fast-tracked (completed immediately).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanFastTrackCraftTask(ItemCrafter itemCrafter, ItemCraftTask local2, int taskID)
{
	Puts("CanFastTrackCraftTask has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ ItemCrafter]
public bool FastTrackTask(int taskID)
{
	if (queue.Count == 0)
	{
		return false;
	}
	if (owner != null && owner.IsTransferring())
	{
		return false;
	}
	ItemCraftTask value = queue.First.Value;
	if (value == null)
	{
		return false;
	}
	ItemCraftTask itemCraftTask = System.Linq.Enumerable.FirstOrDefault(queue, (ItemCraftTask x) => x.taskUID == taskID && !x.cancelled);
	if (itemCraftTask == null)
	{
		return false;
	}
	if (itemCraftTask == value)
	{
		return false;
	}
	value.endTime = 0f;
	queue.Remove(itemCraftTask);
	queue.AddFirst(itemCraftTask);
	owner.Command("note.craft_fasttracked", taskID);
	return true;
}

```
:::
