# CanSeeStash
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called during the check for revealing a hidden stash to a player. Plugins can override this to prevent or allow stash discovery.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanSeeStash(BasePlayer basePlayer, StashContainer entity)
{
	Puts("CanSeeStash has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void CheckStashRevealInvoke()
{
	for (int i = 0; i < nearbyStashes.Count; i++)
	{
		BasePlayer.NearbyStash nearbyStash = nearbyStashes[i];
		if (nearbyStash.Entity == null || nearbyStash.Entity.IsDestroyed)
		{
			nearbyStashes.RemoveAt(i);
		}
		else if (nearbyStash.Entity.IsHidden() && nearbyStash.Entity.PlayerInRange(this))
		{
			nearbyStash.LookingAtTime += StashContainer.PlayerDetectionTickRate;
			if (nearbyStash.LookingAtTime >= nearbyStash.Entity.uncoverTime)
			{
				nearbyStash.Entity.SetHidden(isHidden: false);
				Facepunch.Rust.Analytics.Azure.OnStashRevealed(this, nearbyStash.Entity);
			}
		}
		else
		{
			nearbyStash.LookingAtTime = 0f;
		}
	}
}

```
:::
