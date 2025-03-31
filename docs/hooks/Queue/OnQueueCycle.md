# OnQueueCycle
<Badge type="info" text="Queue"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called on each cycle of the connection queue processing (checking slots and moving players into the server).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnQueueCycle()
{
	Puts("OnQueueCycle has been fired!");
	return (object)default;
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
