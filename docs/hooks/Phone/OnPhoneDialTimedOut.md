<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPhoneDialTimedOut
Called after a phone call has timed out without an answer.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPhoneDialTimedOut()
{
	Puts("OnPhoneDialTimedOut has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ PhoneController]
public void TimeOutDialing()
{
	if (activeCallTo != null)
	{
		activeCallTo.ServerPlayAnsweringMessage(this);
	}
	SetPhoneState(Telephone.CallState.Idle);
}

```
:::
