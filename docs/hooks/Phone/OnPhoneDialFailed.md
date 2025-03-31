# OnPhoneDialFailed
<Badge type="info" text="Phone"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a phone call attempt has failed, providing the failure reason.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPhoneDialFailed(PhoneController phoneController, Telephone.DialFailReason reason, PhoneController self1)
{
	Puts("OnPhoneDialFailed has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ PhoneController]
public void OnDialFailed(Telephone.DialFailReason reason)
{
	SetPhoneState(Telephone.CallState.Idle);
	base.baseEntity.ClientRPC(RpcTarget.NetworkGroup("ClientOnDialFailed"), (int)reason);
	activeCallTo = null;
	if (IsInvoking(TimeOutCall))
	{
		CancelInvoke(TimeOutCall);
	}
	if (IsInvoking(TriggerTimeOut))
	{
		CancelInvoke(TriggerTimeOut);
	}
	if (IsInvoking(TimeOutDialing))
	{
		CancelInvoke(TimeOutDialing);
	}
}

```
:::
