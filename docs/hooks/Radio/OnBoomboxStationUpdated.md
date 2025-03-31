# OnBoomboxStationUpdated
<Badge type="info" text="Radio"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a boombox's radio station has been changed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnBoomboxStationUpdated()
{
	Puts("OnBoomboxStationUpdated has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BoomBox]
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
:::
