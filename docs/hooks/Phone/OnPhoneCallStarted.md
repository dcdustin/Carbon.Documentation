<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPhoneCallStarted
```csharp
public void BeginCall()
{
	if (IsMobile && activeCallTo != null && !activeCallTo.RequirePower)
	{
		_ = currentPlayer != null;
	}
	SetPhoneStateWithPlayer(Telephone.CallState.InProcess);
	Invoke(TimeOutCall, TelephoneManager.MaxCallLength);
}

```
