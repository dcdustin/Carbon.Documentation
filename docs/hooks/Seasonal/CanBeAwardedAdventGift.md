<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanBeAwardedAdventGift
Called to check if a player has already received today’s advent gift (whether they can be awarded again).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanBeAwardedAdventGift()
{
	Puts("CanBeAwardedAdventGift has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ AdventCalendar]
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
:::
