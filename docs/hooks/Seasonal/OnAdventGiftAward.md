# OnAdventGiftAward
<Badge type="info" text="Seasonal"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when an advent calendar gift is about to be awarded to a player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnAdventGiftAward()
{
	Puts("OnAdventGiftAward has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ AdventCalendar]
public void AwardGift(BasePlayer player)
{
	System.DateTime now = System.DateTime.Now;
	int num = ((overrideAdventCalendarDay > 0) ? overrideAdventCalendarDay : now.Day) - startDay;
	if (((overrideAdventCalendarMonth > 0) ? overrideAdventCalendarMonth : now.Month) != startMonth || num < 0 || num >= days.Length)
	{
		return;
	}
	if (!playerRewardHistory.ContainsKey(player.userID))
	{
		playerRewardHistory.Add(player.userID, new System.Collections.Generic.List<int>());
	}
	playerRewardHistory[player.userID].Add(num);
	Effect.server.Run(giftEffect.resourcePath, player.transform.position);
	if (num >= 0 && num < crosses.Length)
	{
		Effect.server.Run(boxCloseEffect.resourcePath, base.transform.position + UnityEngine.Vector3.up * 1.5f);
	}
	AdventCalendar.DayReward dayReward = days[num];
	ItemAmount[] rewards = dayReward.rewards;
	if (ConVar.Server.Era != 0 && dayReward.alternativeRewards != null)
	{
		AdventCalendar.AlternativeReward[] alternativeRewards = dayReward.alternativeRewards;
		foreach (AdventCalendar.AlternativeReward alternativeReward in alternativeRewards)
		{
			if (alternativeReward.era == ConVar.Server.Era)
			{
				rewards = alternativeReward.rewards;
				break;
			}
		}
	}
	foreach (ItemAmount itemAmount in rewards)
	{
		if (itemAmount.itemDef.IsAllowedInEra(Rust.EraRestriction.Loot))
		{
			player.GiveItem(ItemManager.CreateByItemID(itemAmount.itemid, UnityEngine.Mathf.CeilToInt(itemAmount.amount), 0uL).SetItemOwnership(player, ItemOwnershipPhrases.AdventCalendar), BaseEntity.GiveItemReason.PickedUp);
		}
	}
}

```
:::
