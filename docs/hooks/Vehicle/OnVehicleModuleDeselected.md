<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnVehicleModuleDeselected
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnVehicleModuleDeselected()
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
