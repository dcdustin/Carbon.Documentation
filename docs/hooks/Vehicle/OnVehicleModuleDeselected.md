<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnVehicleModuleDeselected
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_DeselectedLootItem(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (player.inventory.loot.IsLooting() && !(player.inventory.loot.entitySource != this) && player.inventory.loot.RemoveContainerAt(3))
	{
		player.inventory.loot.SendImmediate();
	}
}

```
