# OnPhoneNameUpdated
<Badge type="info" text="Electronic"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a Telephone’s name has been changed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPhoneNameUpdated()
{
	Puts("OnPhoneNameUpdated has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ PhoneController]
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
:::
