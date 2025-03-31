# CanAssignBed
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called to check if a bed or sleeping bag can be assigned to a player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanAssignBed(BasePlayer player, SleepingBag sleepingBag, ulong local0)
{
	Puts("CanAssignBed has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ SleepingBag]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void AssignToFriend(BaseEntity.RPCMessage msg)
{
	if (!msg.player.CanInteract() || deployerUserID != (ulong)msg.player.userID)
	{
		return;
	}
	ulong num = msg.read.UInt64();
	if (num == 0L)
	{
		return;
	}
	if (ConVar.Server.max_sleeping_bags > 0)
	{
		SleepingBag.CanAssignBedResult? canAssignBedResult = CanAssignBed(msg.player, this, num);
		if (canAssignBedResult.HasValue)
		{
			BasePlayer basePlayer = RelationshipManager.FindByID(num);
			if (canAssignBedResult.Value.Result == SleepingBag.BagResultType.TooManyBags)
			{
				if (basePlayer == null)
				{
					msg.player.ShowToast(GameTip.Styles.Error, cannotAssignBedNoPlayerPhrase, false);
				}
				else
				{
					string playerNameStreamSafe = NameHelper.GetPlayerNameStreamSafe(msg.player, basePlayer);
					msg.player.ShowToast(GameTip.Styles.Error, cannotAssignBedPhrase, false, playerNameStreamSafe);
				}
			}
			else if (canAssignBedResult.Value.Result == SleepingBag.BagResultType.BagBlocked)
			{
				msg.player.ShowToast(GameTip.Styles.Error, bedAssigningBlocked, false);
			}
			else if (canAssignBedResult.Value.Result == SleepingBag.BagResultType.TargetIsPlayingTutorial)
			{
				msg.player.ShowToast(GameTip.Styles.Error, tutorialPhrase, false);
			}
			else
			{
				basePlayer?.ShowToast(GameTip.Styles.Blue_Long, assignedBagPhrase, false, canAssignBedResult.Value.Count.ToString(), canAssignBedResult.Value.Max.ToString());
				msg.player.ShowToast(GameTip.Styles.Blue_Long, bagLimitPhrase, false, (GetSleepingBagCount(msg.player.userID) - 1).ToString(), canAssignBedResult.Value.Max.ToString());
			}
			if (canAssignBedResult.Value.Result != 0)
			{
				return;
			}
		}
	}
	ulong num2 = deployerUserID;
	deployerUserID = num;
	NotifyPlayer(num2);
	NotifyPlayer(deployerUserID);
	OnBagChangedOwnership(this, num2);
	Facepunch.Rust.Analytics.Azure.OnSleepingBagAssigned(msg.player, this, num);
	SendNetworkUpdate();
}

```
:::
