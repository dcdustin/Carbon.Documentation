# OnNpcGiveSoldItem
<Badge type="info" text="NPC"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an NPC vendor gives a sold item to a player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcGiveSoldItem(NPCVendingMachine nPCVendingMachine, Item soldItem, BasePlayer buyer)
{
	Puts("OnNpcGiveSoldItem has been fired!");
	return (object)default;
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
