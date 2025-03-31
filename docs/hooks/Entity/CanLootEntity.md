# CanLootEntity
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player attempts to loot an entity or container. Plugins can use this to allow or block the looting action.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanLootEntity(WorldItem worldItem)
{
	Puts("CanLootEntity has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ WorldItem]
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
:::
