<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBoomboxStationUpdate
```csharp
public void Server_UpdateRadioIP(BaseEntity.RPCMessage msg)
{
	string text = msg.read.String();
	if (IsStationValid(text))
	{
		if (msg.player != null)
		{
			ulong assignedRadioBy = msg.player.userID.Get();
			AssignedRadioBy = assignedRadioBy;
		}
		CurrentRadioIp = text;
		base.baseEntity.ClientRPC(RpcTarget.NetworkGroup("OnRadioIPChanged"), CurrentRadioIp);
		if (IsOn())
		{
			ServerTogglePlay(play: false);
		}
	}
}

```
