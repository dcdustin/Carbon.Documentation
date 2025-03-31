# OnCodeEntered
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCodeEntered(CodeLock codeLock, BasePlayer player, string local0)
{
	Puts("OnCodeEntered has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ CodeLock]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f, CheckParent = true)]
public void UnlockWithCode(BaseEntity.RPCMessage rpc)
{
	if (!rpc.player.CanInteract() || !IsLocked() || IsCodeEntryBlocked())
	{
		return;
	}
	string text = rpc.read.String();
	bool flag = text == guestCode;
	bool flag2 = text == code;
	if (!(text == code) && (!hasGuestCode || !(text == guestCode)))
	{
		if (UnityEngine.Time.realtimeSinceStartup > lastWrongTime + 60f)
		{
			wrongCodes = 0;
		}
		DoEffect(effectDenied.resourcePath);
		DoEffect(effectShock.resourcePath);
		rpc.player.Hurt((float)(wrongCodes + 1) * 5f, Rust.DamageType.ElectricShock, this, useProtection: false);
		wrongCodes++;
		if (wrongCodes > 5)
		{
			rpc.player.ShowToast(GameTip.Styles.Red_Normal, blockwarning, false);
		}
		if ((float)wrongCodes >= maxFailedAttempts)
		{
			SetFlag(BaseEntity.Flags.Reserved11, b: true);
			Invoke(ClearCodeEntryBlocked, lockoutCooldown);
		}
		lastWrongTime = UnityEngine.Time.realtimeSinceStartup;
		return;
	}
	SendNetworkUpdate();
	if (flag2)
	{
		if (!whitelistPlayers.Contains(rpc.player.userID))
		{
			DoEffect(effectCodeChanged.resourcePath);
			whitelistPlayers.Add(rpc.player.userID);
			wrongCodes = 0;
		}
		Facepunch.Rust.Analytics.Azure.OnCodeLockEntered(rpc.player, this, isGuest: false);
	}
	else if (flag && !guestPlayers.Contains(rpc.player.userID))
	{
		DoEffect(effectCodeChanged.resourcePath);
		guestPlayers.Add(rpc.player.userID);
		Facepunch.Rust.Analytics.Azure.OnCodeLockEntered(rpc.player, this, isGuest: true);
	}
}

```
:::
