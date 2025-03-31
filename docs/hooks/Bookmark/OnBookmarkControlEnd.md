<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBookmarkControlEnd
```csharp
public void StopControl(BasePlayer ply)
{
	BaseEntity baseEntity = currentlyControllingEnt.Get(serverside: true);
	if ((bool)baseEntity)
	{
		baseEntity.GetComponent<IRemoteControllable>().StopControl(new CameraViewerId(currentPlayerID, 0L));
	}
	if ((bool)ply)
	{
		ply.net.SwitchSecondaryGroup(null);
		ply.SetRcEntityPosition(null);
	}
	currentlyControllingEnt.uid = default(NetworkableId);
	currentPlayerID = 0uL;
	SetFlag(BaseEntity.Flags.Reserved2, b: false, recursive: false, networkupdate: false);
	SendNetworkUpdate();
	SendControlBookmarks(ply);
	CancelInvoke(ControlCheck);
	CancelInvoke(CheckCCTVAchievement);
}

```
