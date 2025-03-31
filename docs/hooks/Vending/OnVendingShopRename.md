# OnVendingShopRename
<Badge type="info" text="Vending"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnVendingShopRename(VendingMachine vendingMachine, string local1, BasePlayer local0)
{
	Puts("OnVendingShopRename has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ VendingMachine]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_UpdateShopName(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	string text = msg.read.String(32);
	if (CanPlayerAdmin(player))
	{
		shopName = text;
		nameLastEditedBy = player.userID.Get();
		UpdateMapMarker();
	}
}

```
:::
