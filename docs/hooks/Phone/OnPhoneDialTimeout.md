# OnPhoneDialTimeout
<Badge type="info" text="Phone"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a phone call attempt times out from no answer.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPhoneDialTimeout()
{
	Puts("OnPhoneDialTimeout has been fired!");
	return (System.Object)default;
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
