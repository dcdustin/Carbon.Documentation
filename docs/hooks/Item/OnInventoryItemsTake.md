<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInventoryItemsTake
```csharp
public int Take(System.Collections.Generic.List<Item> collect, int itemid, int amount)
{
	int num = 0;
	if (containerMain != null)
	{
		int num2 = containerMain.Take(collect, itemid, amount);
		num += num2;
		amount -= num2;
	}
	if (amount <= 0)
	{
		return num;
	}
	if (containerBelt != null)
	{
		int num3 = containerBelt.Take(collect, itemid, amount);
		num += num3;
		amount -= num3;
	}
	if (amount <= 0)
	{
		return num;
	}
	if (containerWear != null)
	{
		int num4 = containerWear.Take(collect, itemid, amount);
		num += num4;
		amount -= num4;
	}
	return num;
}

```
