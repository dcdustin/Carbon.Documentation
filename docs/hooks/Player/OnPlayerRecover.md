<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerRecover
```csharp
public void RecoverFromWounded()
{
	if (IsCrawling())
	{
		base.health = UnityEngine.Random.Range(2f, 6f) + healingWhileCrawling;
	}
	healingWhileCrawling = 0f;
	SetPlayerFlag(BasePlayer.PlayerFlags.Wounded, b: false);
	SetPlayerFlag(BasePlayer.PlayerFlags.Incapacitated, b: false);
	if ((bool)BaseGameMode.GetActiveGameMode(base.isServer))
	{
		BaseGameMode.GetActiveGameMode(base.isServer).OnPlayerRevived(null, this);
	}
}

```
