# OnShopCancelClick
<Badge type="info" text="Shop"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnShopCancelClick()
{
	Puts("OnShopCancelClick has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ShopFront]
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
:::
