<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSleepingBagValidCheck
```csharp
public virtual bool ValidForPlayer(ulong playerID, bool ignoreTimers)
{
	if (deployerUserID == playerID)
	{
		if (!ignoreTimers)
		{
			return unlockTime < UnityEngine.Time.realtimeSinceStartup;
		}
		return true;
	}
	return false;
}

```
