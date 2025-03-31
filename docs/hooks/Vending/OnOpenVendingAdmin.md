# OnOpenVendingAdmin
<Badge type="info" text="Vending"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnOpenVendingAdmin(VendingMachine vendingMachine, BasePlayer local0)
{
	Puts("OnOpenVendingAdmin has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ VendingMachine]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_OpenAdmin(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (CanPlayerAdmin(player))
	{
		OpenShop(player);
		ClientRPC(RpcTarget.Player("CLIENT_OpenAdminMenu", player));
	}
}

```
:::
