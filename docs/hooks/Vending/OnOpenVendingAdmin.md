<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnOpenVendingAdmin
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnOpenVendingAdmin()
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
