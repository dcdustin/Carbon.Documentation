# OnPhoneCallStarted
<Badge type="info" text="Phone"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered once a telephone call has successfully started.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPhoneCallStarted(PhoneController phoneController, PhoneController self1, PhoneController self2)
{
	Puts("OnPhoneCallStarted has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ PhoneController]
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
:::
