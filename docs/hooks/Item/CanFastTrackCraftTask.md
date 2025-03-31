<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanFastTrackCraftTask
```csharp
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
