<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSleepingBagDestroy
```csharp
public static bool DestroyBag(ulong userID, NetworkableId sleepingBag)
{
	SleepingBag sleepingBag2 = System.Linq.Enumerable.FirstOrDefault(FindForPlayer(userID, ignoreTimers: true), (SleepingBag x) => x.net.ID == sleepingBag);
	if (sleepingBag2 == null)
	{
		return false;
	}
	RemoveBagForPlayer(sleepingBag2, sleepingBag2.deployerUserID);
	sleepingBag2.deployerUserID = 0uL;
	sleepingBag2.SendNetworkUpdate();
	BasePlayer basePlayer = BasePlayer.FindByID(userID);
	if (basePlayer != null)
	{
		basePlayer.SendRespawnOptions();
		Facepunch.Rust.Analytics.Azure.OnBagUnclaimed(basePlayer, sleepingBag2);
	}
	return true;
}

```
