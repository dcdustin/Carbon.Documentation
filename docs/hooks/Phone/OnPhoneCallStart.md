# OnPhoneCallStart
<Badge type="info" text="Phone"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a telephone call is initiated (just starting to connect).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPhoneCallStart(PhoneController phoneController, PhoneController self1, PhoneController self2)
{
	Puts("OnPhoneCallStart has been fired!");
	return (object)default;
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
