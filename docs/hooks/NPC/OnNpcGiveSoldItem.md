<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcGiveSoldItem
Called when an NPC vendor gives a sold item to a player.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcGiveSoldItem()
{
	Puts("OnNpcGiveSoldItem has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ NPCVendingMachine]
public override void GiveSoldItem(Item soldItem, BasePlayer buyer)
{
	soldItem.SetItemOwnership(buyer, ItemOwnershipPhrases.VendorSale);
	base.GiveSoldItem(soldItem, buyer);
}

```
:::
