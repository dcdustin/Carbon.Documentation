# OnAddVendingOffer
<Badge type="info" text="Vending"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnAddVendingOffer(VendingMachine vendingMachine, ProtoBuf.VendingMachine.SellOrder local2)
{
	Puts("OnAddVendingOffer has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ VendingMachine]
public void AddSellOrder(int itemToSellID, int itemToSellAmount, int currencyToUseID, int currencyAmount, byte bpState)
{
	ItemDefinition itemDefinition = ItemManager.FindItemDefinition(itemToSellID);
	ItemDefinition itemDefinition2 = ItemManager.FindItemDefinition(currencyToUseID);
	if (!(itemDefinition == null) && !(itemDefinition2 == null))
	{
		currencyAmount = UnityEngine.Mathf.Clamp(currencyAmount, 1, 10000);
		itemToSellAmount = UnityEngine.Mathf.Clamp(itemToSellAmount, 1, itemDefinition.stackable);
		ProtoBuf.VendingMachine.SellOrder sellOrder = new ProtoBuf.VendingMachine.SellOrder();
		sellOrder.ShouldPool = false;
		sellOrder.itemToSellID = itemToSellID;
		sellOrder.itemToSellAmount = itemToSellAmount;
		sellOrder.currencyID = currencyToUseID;
		sellOrder.currencyAmountPerItem = currencyAmount;
		sellOrder.currencyIsBP = bpState == 3 || bpState == 2;
		sellOrder.itemToSellIsBP = bpState == 3 || bpState == 1;
		sellOrders.sellOrders.Add(sellOrder);
		RefreshSellOrderStockLevel(itemDefinition);
		UpdateMapMarker();
		SendNetworkUpdate();
	}
}

```
:::
