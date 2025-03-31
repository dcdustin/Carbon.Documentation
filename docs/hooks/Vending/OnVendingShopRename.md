<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnVendingShopRename
```csharp
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
