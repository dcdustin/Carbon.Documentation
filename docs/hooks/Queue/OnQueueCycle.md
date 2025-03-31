# OnQueueCycle
<Badge type="info" text="Queue"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called on each cycle of the connection queue processing (checking slots and moving players into the server).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnQueueCycle()
{
	Puts("OnQueueCycle has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ConnectionQueue]
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
:::
