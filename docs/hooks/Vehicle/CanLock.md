<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanLock
```csharp
public bool HasLockPermission(ulong steamId)
{
	if (!HasALock)
	{
		return true;
	}
	return whitelistPlayers.Contains(steamId);
}

```
