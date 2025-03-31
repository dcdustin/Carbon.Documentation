# CanVendingAcceptItem
<Badge type="info" text="Vending"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanVendingAcceptItem(VendingMachine vendingMachine)
{
	Puts("CanVendingAcceptItem has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ VendingMachine]
public bool CanAcceptItem(Item item, int targetSlot)
{
	BasePlayer basePlayer = item.GetRootContainer()?.GetOwnerPlayer();
	if (transactionActive || industrialItemIncoming)
	{
		return true;
	}
	if (item.parent == null)
	{
		return true;
	}
	if (base.inventory.itemList.Contains(item))
	{
		return true;
	}
	if (basePlayer == null)
	{
		return false;
	}
	return CanPlayerAdmin(basePlayer);
}

```
:::
