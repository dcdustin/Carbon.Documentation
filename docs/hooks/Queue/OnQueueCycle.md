<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnQueueCycle
```csharp
public void Cycle(int availableSlots)
{
	if (UnityEngine.Time.realtimeSinceStartup > nextCleanupReservedSlots)
	{
		nextCleanupReservedSlots = UnityEngine.Time.realtimeSinceStartup + 1f;
		CleanupExpiredReservedSlots();
	}
	if (queue.Count != 0)
	{
		SendQueueUpdates();
		if (!IsServerFull)
		{
			JoinGame(queue[0]);
		}
	}
}

```
