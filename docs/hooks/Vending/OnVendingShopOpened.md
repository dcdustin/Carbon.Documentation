<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnVendingShopOpened [TravellingVendor]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void SV_OpenMenu(BaseEntity.RPCMessage msg)
{
	if (vendingMachine == null)
	{
		vendingMachine = GetComponentInChildren<NPCVendingMachine>();
	}
	vendingMachine.OpenShop(msg.player);
}

```
