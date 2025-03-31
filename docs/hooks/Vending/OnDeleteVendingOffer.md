# OnDeleteVendingOffer
<Badge type="info" text="Vending"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnDeleteVendingOffer(VendingMachine vendingMachine, int local1)
{
	Puts("OnDeleteVendingOffer has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ VendingMachine]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_DeleteSellOrder(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (CanPlayerAdmin(player))
	{
		int num = msg.read.Int32();
		if (num >= 0 && num < sellOrders.sellOrders.Count)
		{
			ProtoBuf.VendingMachine.SellOrder sellOrder = sellOrders.sellOrders[num];
			Facepunch.Rust.Analytics.Azure.OnVendingMachineOrderChanged(msg.player, this, sellOrder.itemToSellID, sellOrder.itemToSellAmount, sellOrder.itemToSellIsBP, sellOrder.currencyID, sellOrder.currencyAmountPerItem, sellOrder.currencyIsBP, added: false);
			sellOrders.sellOrders.RemoveAt(num);
		}
		RefreshSellOrderStockLevel();
		UpdateMapMarker();
		SendSellOrders(player);
	}
}

```
:::
