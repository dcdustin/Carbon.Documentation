<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanLock [key]
```csharp
public void Lock(BasePlayer player)
{
	if (!(player == null) && player.CanInteract() && !IsLocked() && HasLockPermission(player))
	{
		LockLock(player);
		SendNetworkUpdate();
	}
}

```
