<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerDrink
Called when a player drinks water or another consumable liquid.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerDrink()
{
	Puts("OnPlayerDrink has been fired!");
	return (System.Object)default;
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
