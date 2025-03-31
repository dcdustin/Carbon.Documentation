<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnGiveSoldItem
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnGiveSoldItem()
{
	Puts("OnGiveSoldItem has been fired!");
	return (System.Object)default;
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
