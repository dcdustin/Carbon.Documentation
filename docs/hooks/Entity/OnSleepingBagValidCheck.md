# OnSleepingBagValidCheck
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when checking if a sleeping bag is valid for respawn (e.g., not on cooldown). Plugins can override the validity check.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnSleepingBagValidCheck(SleepingBag sleepingBag, ulong playerID, bool ignoreTimers)
{
	Puts("OnSleepingBagValidCheck has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ SleepingBag]
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
:::
