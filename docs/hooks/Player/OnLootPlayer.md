<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLootPlayer
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_LootPlayer(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if ((bool)player && player.CanInteract() && CanBeLooted(player) && player.inventory.loot.StartLootingEntity(this))
	{
		player.inventory.loot.AddContainer(inventory.containerMain);
		player.inventory.loot.AddContainer(inventory.containerWear);
		player.inventory.loot.AddContainer(inventory.containerBelt);
		player.inventory.loot.SendImmediate();
		player.RadioactiveLootCheck(player.inventory.loot.containers);
		player.ClientRPC(RpcTarget.Player("RPC_OpenLootPanel", player), "player_corpse");
	}
}

```
