<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUseLockedEntity [KeyLock, open]
```csharp
public override bool OnTryToOpen(BasePlayer player)
{
	if (HasLockPermission(player))
	{
		return true;
	}
	return !IsLocked();
}

```
