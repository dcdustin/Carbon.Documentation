# OnPhoneDial
<Badge type="info" text="Phone"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a player dials a number on a telephone to start a call.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPhoneDial()
{
	Puts("OnPhoneDial has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ PhoneController]
public void CallPhone(int number)
{
	if (number == PhoneNumber)
	{
		OnDialFailed(Telephone.DialFailReason.CallSelf);
		return;
	}
	if (TelephoneManager.GetCurrentActiveCalls() + 1 > TelephoneManager.MaxConcurrentCalls)
	{
		OnDialFailed(Telephone.DialFailReason.NetworkBusy);
		return;
	}
	PhoneController telephone = TelephoneManager.GetTelephone(number);
	if (telephone != null)
	{
		if (telephone.serverState == Telephone.CallState.Idle && telephone.CanReceiveCall())
		{
			SetPhoneState(Telephone.CallState.Dialing);
			lastDialedNumber = number;
			activeCallTo = telephone;
			activeCallTo.ReceiveCallFrom(this);
		}
		else
		{
			OnDialFailed(Telephone.DialFailReason.Engaged);
			telephone.OnIncomingCallWhileBusy();
		}
	}
	else
	{
		OnDialFailed(Telephone.DialFailReason.WrongNumber);
	}
}

```
:::
