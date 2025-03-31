<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPhoneDialTimedOut
```csharp
public void TimeOutDialing()
{
	if (activeCallTo != null)
	{
		activeCallTo.ServerPlayAnsweringMessage(this);
	}
	SetPhoneState(Telephone.CallState.Idle);
}

```
