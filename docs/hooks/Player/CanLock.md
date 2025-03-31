# CanLock
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player attempts to lock an entity (using a code or key lock).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanLock()
{
	Puts("CanLock has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ KeyLock]
public void Lock(BasePlayer player)
{
	if (!(player == null) && player.CanInteract() && !IsLocked() && HasLockPermission(player))
	{
		LockLock(player);
		SendNetworkUpdate();
	}
}

```
:::
