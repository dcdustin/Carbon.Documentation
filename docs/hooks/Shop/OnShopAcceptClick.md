# OnShopAcceptClick
<Badge type="info" text="Shop"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnShopAcceptClick()
{
	Puts("OnShopAcceptClick has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ShopFront]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void AcceptClicked(BaseEntity.RPCMessage msg)
{
	if (IsTradingPlayer(msg.player) && !(vendorPlayer == null) && !(customerPlayer == null))
	{
		if (IsPlayerVendor(msg.player))
		{
			SetFlag(BaseEntity.Flags.Reserved1, b: true);
			vendorInventory.SetLocked(isLocked: true);
		}
		else if (IsPlayerCustomer(msg.player))
		{
			SetFlag(BaseEntity.Flags.Reserved2, b: true);
			customerInventory.SetLocked(isLocked: true);
		}
		if (HasFlag(BaseEntity.Flags.Reserved1) && HasFlag(BaseEntity.Flags.Reserved2))
		{
			SetFlag(BaseEntity.Flags.Reserved3, b: true);
			Invoke(CompleteTrade, 2f);
		}
	}
}

```
:::
