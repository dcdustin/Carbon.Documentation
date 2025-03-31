<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUseLockedEntity
Called when a player attempts to open or close a locked entity (doors with code or key locks).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUseLockedEntity()
{
	Puts("CanUseLockedEntity has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ KeyLock]
public override bool OnTryToOpen(BasePlayer player)
{
	if (HasLockPermission(player))
	{
		return true;
	}
	return !IsLocked();
}

```
:::
