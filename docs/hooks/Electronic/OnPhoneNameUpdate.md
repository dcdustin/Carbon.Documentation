<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPhoneNameUpdate
Called when a player attempts to change the name of a Telephone. Plugins can use this to allow or modify the phone name change.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPhoneNameUpdate()
{
	Puts("OnPhoneNameUpdate has been fired!");
	return (System.Object)default;
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
