# OnInventoryItemsTake
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when items are taken out of an inventory (to another container or context).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private int OnInventoryItemsTake(PlayerInventory playerInventory)
{
	Puts("OnInventoryItemsTake has been fired!");
	return (int)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerInventory]
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
:::
