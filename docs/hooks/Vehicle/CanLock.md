# CanLock
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player attempts to lock an entity (using a code or key lock).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanLock()
{
	Puts("CanLock has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ ModularCarCodeLock]
public bool HasLockPermission(ulong steamId)
{
	if (!HasALock)
	{
		return true;
	}
	return whitelistPlayers.Contains(steamId);
}

```
:::
