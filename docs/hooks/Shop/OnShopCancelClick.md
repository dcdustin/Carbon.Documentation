# OnShopCancelClick
<Badge type="info" text="Shop"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnShopCancelClick(ShopFront shopFront, BasePlayer player)
{
	Puts("OnShopCancelClick has been fired!");
	return (object)default;
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
