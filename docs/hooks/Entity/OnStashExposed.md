# OnStashExposed
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a hidden stash is revealed (becomes visible to a player).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnStashExposed()
{
	Puts("OnStashExposed has been fired!");
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
