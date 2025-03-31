<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPhoneAnswer
Triggered when a player answers a ringing telephone in-game.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPhoneAnswer()
{
	Puts("OnPhoneAnswer has been fired!");
	return (System.Object)default;
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
