<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPhoneDial
```csharp
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
