<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPhoneDialFailed
```csharp
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
