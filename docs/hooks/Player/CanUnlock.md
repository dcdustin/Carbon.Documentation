<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUnlock
Called when a player attempts to unlock an entity secured by a code or key lock.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUnlock()
{
	Puts("CanUnlock has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ ModularCarCodeLock]
public bool TryOpenWithCode(BasePlayer player, string codeEntered)
{
	if (CodeEntryBlocked(player))
	{
		return false;
	}
	if (!(codeEntered == Code))
	{
		if (UnityEngine.Time.realtimeSinceStartup > lastWrongTime + 60f)
		{
			wrongCodes = 0;
		}
		player.Hurt((float)(wrongCodes + 1) * 5f, Rust.DamageType.ElectricShock, owner, useProtection: false);
		wrongCodes++;
		if (wrongCodes > 5)
		{
			player.ShowToast(GameTip.Styles.Red_Normal, CodeLock.blockwarning, false);
		}
		if ((float)wrongCodes >= CodeLock.maxFailedAttempts)
		{
			owner.SetFlag(BaseEntity.Flags.Reserved10, b: true);
			owner.Invoke(ClearCodeEntryBlocked, CodeLock.lockoutCooldown);
		}
		lastWrongTime = UnityEngine.Time.realtimeSinceStartup;
		return false;
	}
	if (TryAddPlayer(player.userID))
	{
		wrongCodes = 0;
	}
	owner.SendNetworkUpdate();
	return true;
}

```
:::
