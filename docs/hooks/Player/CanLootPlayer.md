<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanLootPlayer
Called to determine if a player can loot another player or their corpse.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanLootPlayer()
{
	Puts("CanLootPlayer has been fired!");
	return (System.Boolean)default;
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
