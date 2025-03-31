# OnRecyclerToggle
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a recycler machine is toggled on or off.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRecyclerToggle(Recycler recycler, BasePlayer player)
{
	Puts("OnRecyclerToggle has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ Recycler]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void SVSwitch(BaseEntity.RPCMessage msg)
{
	bool flag = msg.read.Bit();
	if (flag == IsOn() || msg.player == null || (!flag && onlyOneUser && msg.player.inventory.loot.entitySource != this) || (flag && !HasRecyclable()))
	{
		return;
	}
	if (flag)
	{
		foreach (Item item in base.inventory.itemList)
		{
			item.CollectedForCrafting(msg.player);
		}
		StartRecycling();
	}
	else
	{
		StopRecycling();
	}
}

```
:::
