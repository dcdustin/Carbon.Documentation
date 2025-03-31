# OnPlayerRecovered
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a player has recovered from a wounded state.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerRecovered(BasePlayer basePlayer)
{
	Puts("OnPlayerRecovered has been fired!");
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
