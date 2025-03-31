<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPhoneAnswered
```csharp
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
