<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRecyclerToggle
```csharp
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
