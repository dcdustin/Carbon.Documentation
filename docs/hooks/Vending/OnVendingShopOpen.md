# OnVendingShopOpen
<Badge type="info" text="Vending"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnVendingShopOpen(TravellingVendor travellingVendor, BasePlayer player)
{
	Puts("OnVendingShopOpen has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ TravellingVendor]
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
:::
