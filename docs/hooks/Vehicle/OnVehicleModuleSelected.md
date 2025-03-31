# OnVehicleModuleSelected
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnVehicleModuleSelected(Item local2, ModularCarGarage modularCarGarage, BasePlayer local0)
{
	Puts("OnVehicleModuleSelected has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ModularCarGarage]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_SelectedLootItem(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	ItemId itemUID = msg.read.ItemID();
	if (player == null || !player.inventory.loot.IsLooting() || player.inventory.loot.entitySource != this || !HasOccupant)
	{
		return;
	}
	Item vehicleItem = carOccupant.GetVehicleItem(itemUID);
	if (vehicleItem == null)
	{
		return;
	}
	bool flag = player.inventory.loot.RemoveContainerAt(3);
	if (TryGetModuleForItem(vehicleItem, out var result))
	{
		if (result is VehicleModuleStorage vehicleModuleStorage)
		{
			IItemContainerEntity container = vehicleModuleStorage.GetContainer();
			if (!container.IsUnityNull())
			{
				player.inventory.loot.AddContainer(container.inventory);
				flag = true;
			}
		}
		else if (result is VehicleModuleCamper vehicleModuleCamper)
		{
			IItemContainerEntity container2 = vehicleModuleCamper.GetContainer();
			if (!container2.IsUnityNull())
			{
				player.inventory.loot.AddContainer(container2.inventory);
				flag = true;
			}
		}
	}
	if (flag)
	{
		player.inventory.loot.SendImmediate();
	}
}

```
:::
