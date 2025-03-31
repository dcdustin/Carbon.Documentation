# OnGrowableGathered
<Badge type="info" text="Resource"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a plant has been harvested and its fruit given to the player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnGrowableGathered(GrowableEntity growableEntity, Item local0, BasePlayer player)
{
	Puts("OnGrowableGathered has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ GrowableEntity]
public void GiveFruit(BasePlayer player, int amount, bool eat)
{
	if (amount <= 0)
	{
		return;
	}
	bool flag = Properties.pickupItem.condition.enabled;
	if (flag)
	{
		for (int i = 0; i < amount; i++)
		{
			GiveFruit(player, 1, flag, eat);
		}
	}
	else
	{
		GiveFruit(player, amount, flag, eat);
	}
}

```
:::
