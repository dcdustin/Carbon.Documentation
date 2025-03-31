# OnVehicleModuleDeselected
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnVehicleModuleDeselected(ModularCarGarage modularCarGarage, BasePlayer local0)
{
	Puts("OnVehicleModuleDeselected has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ModularCarGarage]
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
:::
