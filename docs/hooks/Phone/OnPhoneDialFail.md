<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPhoneDialFail
Called when a phone call attempt fails (e.g., target busy or invalid number).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPhoneDialFail()
{
	Puts("OnPhoneDialFail has been fired!");
	return (System.Object)default;
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
