<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanLootEntity
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_OpenLoot(BaseEntity.RPCMessage rpc)
{
	if (item == null || item.contents == null)
	{
		return;
	}
	ItemModContainer component = item.info.GetComponent<ItemModContainer>();
	if (!(component == null) && component.canLootInWorld)
	{
		BasePlayer player = rpc.player;
		if ((bool)player && player.CanInteract() && CanOpenInSafeZone(player) && player.inventory.loot.StartLootingEntity(this))
		{
			SetFlag(BaseEntity.Flags.Open, b: true);
			player.inventory.loot.AddContainer(item.contents);
			player.inventory.loot.SendImmediate();
			player.ClientRPC(RpcTarget.Player("RPC_OpenLootPanel", player), "generic_resizable");
			SendNetworkUpdate();
		}
	}
}

```
