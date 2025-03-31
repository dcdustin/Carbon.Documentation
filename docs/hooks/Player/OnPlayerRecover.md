# OnPlayerRecover
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a wounded player is about to recover (stand up from wounded state).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerRecover()
{
	Puts("OnPlayerRecover has been fired!");
	return (System.Object)default;
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
