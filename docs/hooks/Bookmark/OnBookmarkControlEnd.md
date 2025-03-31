# OnBookmarkControlEnd
<Badge type="info" text="Bookmark"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player stops controlling a remote entity via the Computer Station (before control is fully terminated).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBookmarkControlEnd(ComputerStation computerStation, BasePlayer ply, BaseEntity local0)
{
	Puts("OnBookmarkControlEnd has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ComputerStation]
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
:::
