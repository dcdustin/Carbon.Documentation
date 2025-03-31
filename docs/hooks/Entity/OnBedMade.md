# OnBedMade
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a sleeping bag or bed is placed/created (made available as a respawn point).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnBedMade()
{
	Puts("OnBedMade has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ SleepingBag]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_MakeBed(BaseEntity.RPCMessage msg)
{
	if (!canBePublic || !IsPublic() || !msg.player.CanInteract())
	{
		return;
	}
	if (ConVar.Server.max_sleeping_bags > 0)
	{
		SleepingBag.CanAssignBedResult? canAssignBedResult = CanAssignBed(msg.player, this, msg.player.userID, 1, 0, this);
		if (canAssignBedResult.HasValue)
		{
			if (canAssignBedResult.Value.Result != 0)
			{
				msg.player.ShowToast(GameTip.Styles.Red_Normal, cannotMakeBedPhrase, false);
			}
			else
			{
				msg.player.ShowToast(GameTip.Styles.Blue_Long, bagLimitPhrase, false, canAssignBedResult.Value.Count.ToString(), canAssignBedResult.Value.Max.ToString());
			}
			if (canAssignBedResult.Value.Result != 0)
			{
				return;
			}
		}
	}
	ulong num = deployerUserID;
	deployerUserID = msg.player.userID;
	NotifyPlayer(num);
	NotifyPlayer(deployerUserID);
	OnBagChangedOwnership(this, num);
	SendNetworkUpdate();
}

```
:::
