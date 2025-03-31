# CanChangeCode
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player attempts to change the code on a code lock (to allow or block code change).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanChangeCode()
{
	Puts("CanChangeCode has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ CodeLock]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f, CheckParent = true)]
public void RPC_ChangeCode(BaseEntity.RPCMessage rpc)
{
	if (!rpc.player.CanInteract())
	{
		return;
	}
	string text = rpc.read.String();
	bool flag = rpc.read.Bit();
	if (!IsLocked() && text.Length == 4 && UnityEngine.StringEx.IsNumeric(text) && !(!hasCode && flag))
	{
		if (!hasCode && !flag)
		{
			SetFlag(BaseEntity.Flags.Locked, b: true);
		}
		Facepunch.Rust.Analytics.Azure.OnCodelockChanged(rpc.player, this, flag ? guestCode : code, text, flag);
		if (!flag)
		{
			code = text;
			hasCode = code.Length > 0;
			whitelistPlayers.Clear();
			whitelistPlayers.Add(rpc.player.userID);
		}
		else
		{
			guestCode = text;
			hasGuestCode = guestCode.Length > 0;
			guestPlayers.Clear();
			guestPlayers.Add(rpc.player.userID);
		}
		DoEffect(effectCodeChanged.resourcePath);
		SendNetworkUpdate();
	}
}

```
:::
