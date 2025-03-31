<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPhoneNameUpdate
```csharp
public void UpdatePhoneName(BaseEntity.RPCMessage msg)
{
	if (!(msg.player != currentPlayer))
	{
		string text = msg.read.String();
		if (text.Length > 30)
		{
			text = text.Substring(0, 30);
		}
		PhoneName = text;
		base.baseEntity.SendNetworkUpdate();
	}
}

```
