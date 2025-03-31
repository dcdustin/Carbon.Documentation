# CanUseLockedEntity
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player attempts to open or close a locked entity (doors with code or key locks).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUseLockedEntity(BasePlayer player, KeyLock keyLock)
{
	Puts("CanUseLockedEntity has been fired!");
	return (bool)default;
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
