<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanLootPlayer
```csharp
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
