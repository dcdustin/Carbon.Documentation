<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanVendingAcceptItem
```csharp
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
