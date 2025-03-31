# OnSleepingBagDestroy
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a sleeping bag or bed is about to be destroyed (player or game logic initiates its removal).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSleepingBagDestroy()
{
	Puts("OnSleepingBagDestroy has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ SleepingBag]
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
:::
