<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanBeAwardedAdventGift
```csharp
public bool WasAwardedTodaysGift(BasePlayer player)
{
	if (!playerRewardHistory.ContainsKey(player.userID))
	{
		return false;
	}
	System.DateTime now = System.DateTime.Now;
	if (((overrideAdventCalendarMonth > 0) ? overrideAdventCalendarMonth : now.Month) != startMonth)
	{
		return true;
	}
	int num = ((overrideAdventCalendarDay > 0) ? overrideAdventCalendarDay : now.Day) - startDay;
	if (num < 0 || num >= days.Length)
	{
		return true;
	}
	if (playerRewardHistory[player.userID].Contains(num))
	{
		return true;
	}
	return false;
}

```
