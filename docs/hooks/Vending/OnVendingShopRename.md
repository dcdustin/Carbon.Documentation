<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnVendingShopRename
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnVendingShopRename()
{
	Puts("OnVendingShopRename has been fired!");
	return (System.Object)default;
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
