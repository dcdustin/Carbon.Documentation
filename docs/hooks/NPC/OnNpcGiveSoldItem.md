<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcGiveSoldItem
```csharp
public override void GiveSoldItem(Item soldItem, BasePlayer buyer)
{
	soldItem.SetItemOwnership(buyer, ItemOwnershipPhrases.VendorSale);
	base.GiveSoldItem(soldItem, buyer);
}

```
