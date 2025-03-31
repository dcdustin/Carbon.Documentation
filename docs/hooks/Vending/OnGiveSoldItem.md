# OnGiveSoldItem
<Badge type="info" text="Vending"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnGiveSoldItem(VendingMachine vendingMachine, Item soldItem, BasePlayer buyer)
{
	Puts("OnGiveSoldItem has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ VendingMachine]
public virtual void GiveSoldItem(Item soldItem, BasePlayer buyer)
{
	while (soldItem.amount > soldItem.MaxStackable())
	{
		Item item = soldItem.SplitItem(soldItem.MaxStackable());
		buyer.GiveItem(item, BaseEntity.GiveItemReason.PickedUp);
	}
	buyer.GiveItem(soldItem, BaseEntity.GiveItemReason.PickedUp);
}

```
:::
