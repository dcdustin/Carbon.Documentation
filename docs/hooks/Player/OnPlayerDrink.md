# OnPlayerDrink
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player drinks water or another consumable liquid.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerDrink(BasePlayer player, LiquidContainer liquidContainer)
{
	Puts("OnPlayerDrink has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ LiquidContainer]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void SVDrink(BaseEntity.RPCMessage rpc)
{
	if (!rpc.player.metabolism.CanConsume())
	{
		return;
	}
	foreach (Item item in base.inventory.itemList)
	{
		ItemModConsume component = item.info.GetComponent<ItemModConsume>();
		if (!(component == null) && component.CanDoAction(item, rpc.player))
		{
			component.DoAction(item, rpc.player);
			break;
		}
	}
}

```
:::
