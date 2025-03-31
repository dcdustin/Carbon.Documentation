# OnPhoneCallStart
<Badge type="info" text="Phone"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a telephone call is initiated (just starting to connect).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPhoneCallStart()
{
	Puts("OnPhoneCallStart has been fired!");
	return (System.Object)default;
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
