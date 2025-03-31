<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnShopCancelClick
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void CancelClicked(BaseEntity.RPCMessage msg)
{
	if (IsTradingPlayer(msg.player))
	{
		_ = (bool)vendorPlayer;
		_ = (bool)customerPlayer;
		ResetTrade();
	}
}

```
