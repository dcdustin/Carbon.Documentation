<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnGrowableGathered
```csharp
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
