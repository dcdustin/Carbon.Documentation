# OnPhoneAnswered
<Badge type="info" text="Phone"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered after a player has answered a phone call (connection established).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPhoneAnswered()
{
	Puts("OnPhoneAnswered has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ PhoneController]
public void AnswerPhone(BaseEntity.RPCMessage msg)
{
	if (IsInvoking(TimeOutDialing))
	{
		CancelInvoke(TimeOutDialing);
	}
	if (!(activeCallTo == null))
	{
		BasePlayer player = msg.player;
		UpdateServerPlayer(player);
		BeginCall();
		activeCallTo.BeginCall();
	}
}

```
:::
