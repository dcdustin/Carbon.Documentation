<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnOpenVendingAdmin
```csharp
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
