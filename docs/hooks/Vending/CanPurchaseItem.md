<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanPurchaseItem
- Called when a player attempts to purchase an item (e.g., from a vending machine), to decide if the purchase is allowed.
- Return false to block the purchase.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanPurchaseItem()
{
	Puts("CanPurchaseItem has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ VendingMachine]
public bool DoTransaction(BasePlayer buyer, int sellOrderId, int numberOfTransactions = 1, ItemContainer targetContainer = null, System.Action<BasePlayer, Item> onCurrencyRemoved = null, System.Action<BasePlayer, Item> onItemPurchased = null, MarketTerminal droneMarketTerminal = null)
{
	if (sellOrderId < 0 || sellOrderId >= sellOrders.sellOrders.Count)
	{
		return false;
	}
	if (targetContainer == null && UnityEngine.Vector3.Distance(buyer.transform.position, base.transform.position) > 4f)
	{
		return false;
	}
	ProtoBuf.VendingMachine.SellOrder sellOrder = sellOrders.sellOrders[sellOrderId];
	System.Collections.Generic.List<Item> obj = Facepunch.Pool.Get<System.Collections.Generic.List<Item>>();
	GetItemsToSell(sellOrder, obj);
	if (obj == null || obj.Count == 0)
	{
		Facepunch.Pool.FreeUnmanaged(ref obj);
		return false;
	}
	numberOfTransactions = UnityEngine.Mathf.Clamp(numberOfTransactions, 1, obj[0].hasCondition ? 1 : 1000000);
	int num = sellOrder.itemToSellAmount * numberOfTransactions;
	ItemDefinition itemDefinition = ItemManager.FindItemDefinition(sellOrder.itemToSellID);
	ItemDefinition itemDefinition2 = ItemManager.FindItemDefinition(sellOrder.currencyID);
	if (!itemDefinition.IsAllowedInEra(CurrentEraRestriction) || !itemDefinition2.IsAllowedInEra(CurrentEraRestriction))
	{
		return false;
	}
	if (itemDefinition == NPCVendingMachine.ScrapItem && sellOrder.receivedQuantityMultiplier != 1f)
	{
		num = GetTotalReceivedMerchandiseForOrder(sellOrder.itemToSellAmount, sellOrder.receivedQuantityMultiplier) * numberOfTransactions;
	}
	int num2 = System.Linq.Enumerable.Sum(obj, (Item x) => x.amount);
	if (num > num2)
	{
		Facepunch.Pool.FreeUnmanaged(ref obj);
		return false;
	}
	System.Collections.Generic.List<Item> source = buyer.inventory.FindItemsByItemID(sellOrder.currencyID);
	if (sellOrder.currencyIsBP)
	{
		source = System.Linq.Enumerable.ToList(System.Linq.Enumerable.Where(buyer.inventory.FindItemsByItemID(blueprintBaseDef.itemid), (Item x) => x.blueprintTarget == sellOrder.currencyID));
	}
	source = System.Linq.Enumerable.ToList(System.Linq.Enumerable.Where(System.Linq.Enumerable.Where(source, (Item x) => !x.hasCondition || (x.conditionNormalized >= 0.5f && x.maxConditionNormalized > 0.5f)), (Item x) => x.GetItemVolume() <= maxCurrencyVolume));
	if (source.Count == 0)
	{
		Facepunch.Pool.FreeUnmanaged(ref obj);
		return false;
	}
	int num3 = System.Linq.Enumerable.Sum(source, (Item x) => x.amount);
	int num4 = GetTotalPriceForOrder(sellOrder) * numberOfTransactions;
	if (num3 < num4)
	{
		Facepunch.Pool.FreeUnmanaged(ref obj);
		return false;
	}
	transactionActive = true;
	int num5 = 0;
	foreach (Item item3 in source)
	{
		int num6 = UnityEngine.Mathf.Min(num4 - num5, item3.amount);
		Item item = ((item3.amount > num6) ? item3.SplitItem(num6) : item3);
		TakeCurrencyItem(item);
		onCurrencyRemoved?.Invoke(buyer, item);
		num5 += num6;
		if (num5 >= num4)
		{
			break;
		}
	}
	int num7 = 0;
	foreach (Item item4 in obj)
	{
		int num8 = num - num7;
		Item item2 = ((item4.amount > num8) ? item4.SplitItem(num8) : item4);
		if (item2 == null)
		{
			UnityEngine.Debug.LogError("Vending machine error, contact developers!");
		}
		else
		{
			num7 += item2.amount;
			RecordSaleAnalytics(item2, sellOrderId, sellOrder.currencyAmountPerItem);
			if (targetContainer == null)
			{
				GiveSoldItem(item2, buyer);
			}
			else if (!item2.MoveToContainer(targetContainer))
			{
				item2.Drop(targetContainer.dropPosition, targetContainer.dropVelocity);
			}
			if (ShouldRecordStats)
			{
				RegisterCustomer(buyer.userID);
			}
			onItemPurchased?.Invoke(buyer, item2);
		}
		if (num7 >= num)
		{
			break;
		}
	}
	Facepunch.Rust.Analytics.Azure.OnBuyFromVendingMachine(buyer, this, sellOrder.itemToSellID, num, sellOrder.itemToSellIsBP, sellOrder.currencyID, num5, sellOrder.currencyIsBP, numberOfTransactions, sellOrder.priceMultiplier, droneMarketTerminal);
	if (ShouldRecordStats)
	{
		AddPurchaseHistory(sellOrder.itemToSellID, num, sellOrder.currencyID, num5, sellOrder.itemToSellIsBP, sellOrder.currencyIsBP);
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
	UpdateEmptyFlag();
	transactionActive = false;
	return true;
}

```
:::
