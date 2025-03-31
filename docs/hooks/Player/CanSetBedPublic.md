<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanSetBedPublic
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public virtual void RPC_MakePublic(BaseEntity.RPCMessage msg)
{
	if (!canBePublic || !msg.player.CanInteract() || (deployerUserID != (ulong)msg.player.userID && !msg.player.CanBuild()))
	{
		return;
	}
	bool flag = msg.read.Bit();
	if (flag == IsPublic())
	{
		return;
	}
	SetPublic(flag);
	if (!IsPublic())
	{
		if (ConVar.Server.max_sleeping_bags > 0)
		{
			SleepingBag.CanAssignBedResult? canAssignBedResult = CanAssignBed(msg.player, this, msg.player.userID, 1, 0, this);
			if (canAssignBedResult.HasValue)
			{
				if (canAssignBedResult.Value.Result == SleepingBag.BagResultType.Ok)
				{
					msg.player.ShowToast(GameTip.Styles.Blue_Long, bagLimitPhrase, false, canAssignBedResult.Value.Count.ToString(), canAssignBedResult.Value.Max.ToString());
				}
				else
				{
					msg.player.ShowToast(GameTip.Styles.Blue_Long, cannotMakeBedPhrase, false, canAssignBedResult.Value.Count.ToString(), canAssignBedResult.Value.Max.ToString());
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
		Facepunch.Rust.Analytics.Azure.OnSleepingBagAssigned(msg.player, this, deployerUserID = msg.player.userID);
	}
	else
	{
		Facepunch.Rust.Analytics.Azure.OnSleepingBagAssigned(msg.player, this, 0uL);
	}
	SendNetworkUpdate();
}

```
