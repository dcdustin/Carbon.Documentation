# OnPhoneDialTimedOut
<Badge type="info" text="Phone"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a phone call has timed out without an answer.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPhoneDialTimedOut(PhoneController phoneController, PhoneController self1, PhoneController self2)
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
