<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnGiveSoldItem
```csharp
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
