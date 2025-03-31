# CanLootPlayer
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called to determine if a player can loot another player or their corpse.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanLootPlayer(BasePlayer basePlayer)
{
	Puts("CanLootPlayer has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public override bool CanBeLooted(BasePlayer player)
{
	if (player == this)
	{
		return false;
	}
	if ((IsWounded() || IsSleeping() || CurrentGestureIsSurrendering || IsRestrainedOrSurrendering) && !IsLoadingAfterTransfer())
	{
		return !IsTransferring();
	}
	return false;
}

```
:::
