# OnMarketplaceTerminalPurchase
<Badge type="info" text="Vending"/><Badge type="danger" text="Carbon Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnMarketplaceTerminalPurchase(MarketTerminal terminal, VendingMachine vending, BasePlayer player, int sellOrderIndex, int amount)
{
	Puts("OnMarketplaceTerminalPurchase has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ MarketTerminal]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(10uL)]
public void Server_Purchase(BaseEntity.RPCMessage msg)
{
	if (!CanPlayerInteract(msg.player))
	{
		return;
	}
	if (!_marketplace.IsValid(serverside: true))
	{
		UnityEngine.Debug.LogError("Marketplace is not set", this);
		return;
	}
	NetworkableId networkableId = msg.read.EntityID();
	int num = msg.read.Int32();
	int num2 = msg.read.Int32();
	VendingMachine vendingMachine = BaseNetworkable.serverEntities.Find(networkableId) as VendingMachine;
	if (vendingMachine == null || !vendingMachine.IsValid() || num < 0 || num >= vendingMachine.sellOrders.sellOrders.Count || num2 <= 0 || base.inventory.IsFull())
	{
		return;
	}
	GetDeliveryEligibleVendingMachines(null);
	if (_deliveryEligible == null || !_deliveryEligible.Contains(networkableId))
	{
		return;
	}
	try
	{
		_transactionActive = true;
		int num3 = deliveryFeeAmount;
		ProtoBuf.VendingMachine.SellOrder sellOrder = vendingMachine.sellOrders.sellOrders[num];
		if (!CanPlayerAffordOrderAndDeliveryFee(msg.player, sellOrder, num2))
		{
			return;
		}
		int num4 = msg.player.inventory.Take(null, deliveryFeeCurrency.itemid, num3);
		if (num4 != num3)
		{
			UnityEngine.Debug.LogError($"Took an incorrect number of items for the delivery fee (took {num4}, should have taken {num3})");
		}
		ClientRPC(RpcTarget.Player("Client_ShowItemNotice", msg.player), deliveryFeeCurrency.itemid, -num3, arg3: false);
		if (!vendingMachine.DoTransaction(msg.player, num, num2, base.inventory, _onCurrencyRemovedCached, _onItemPurchasedCached, this))
		{
			Item item = ItemManager.CreateByItemID(deliveryFeeCurrency.itemid, num3, 0uL);
			if (!msg.player.inventory.GiveItem(item))
			{
				item.Drop(msg.player.inventory.containerMain.dropPosition, msg.player.inventory.containerMain.dropVelocity);
			}
		}
		else
		{
			RestrictToPlayer(msg.player);
			RegisterOrder(msg.player, vendingMachine);
		}
	}
	finally
	{
		_transactionActive = false;
	}
}

```
:::
