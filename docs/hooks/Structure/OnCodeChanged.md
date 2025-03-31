<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCodeChanged
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnCodeChanged()
{
	Puts("OnCodeChanged has been fired!");
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
