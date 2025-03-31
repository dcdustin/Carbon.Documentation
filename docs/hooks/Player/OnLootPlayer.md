# OnLootPlayer
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a player starts looting another player's inventory (e.g., a corpse or sleeper).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnLootPlayer()
{
	Puts("OnLootPlayer has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
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
:::
