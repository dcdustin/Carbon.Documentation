# OnFindBurnable
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an oven or furnace checks its inventory for burnable fuel.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private Item OnFindBurnable(BaseOven baseOven)
{
	Puts("OnFindBurnable has been fired!");
	return (Item)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseOven]
public Item FindBurnable()
{
	if (base.inventory == null)
	{
		return null;
	}
	foreach (Item item in base.inventory.itemList)
	{
		if (IsBurnableItem(item))
		{
			return item;
		}
	}
	return null;
}

```
:::
