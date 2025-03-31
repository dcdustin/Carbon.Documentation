# OnPlayerRecover
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a wounded player is about to recover (stand up from wounded state).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerRecover(BasePlayer basePlayer)
{
	Puts("OnPlayerRecover has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
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
:::
