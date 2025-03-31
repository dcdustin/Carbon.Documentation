# OnCoalingTowerGather
<Badge type="info" text="Resource"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Triggered during the coaling tower's unloading process (transferring resources from a train to storage).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCoalingTowerGather()
{
	Puts("OnCoalingTowerGather has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ CoalingTower]
public void EmptyTenPercent()
{
	if (!IsPowered())
	{
		EndEmptyProcess(CoalingTower.ActionAttemptStatus.GenericError);
		return;
	}
	if (!HasUnloadableLinedUp)
	{
		EndEmptyProcess(CoalingTower.ActionAttemptStatus.NoTrainCar);
		return;
	}
	TrainCarUnloadable activeUnloadable = GetActiveUnloadable();
	if (tcUnloadingNow == null || activeUnloadable != tcUnloadingNow)
	{
		EndEmptyProcess(CoalingTower.ActionAttemptStatus.NoTrainCar);
		return;
	}
	StorageContainer storageContainer = tcUnloadingNow.GetStorageContainer();
	if (storageContainer.inventory == null || !TrainWagonLootData.instance.TryGetLootFromIndex(LootTypeIndex, out var lootOption))
	{
		EndEmptyProcess(CoalingTower.ActionAttemptStatus.NoTrainCar);
		return;
	}
	bool flag = tcUnloadingNow.wagonType != TrainCarUnloadable.WagonType.Fuel;
	ItemContainer itemContainer = null;
	PercentFullStorageContainer percentFullStorageContainer = (flag ? GetOreStorage() : GetFuelStorage());
	if (percentFullStorageContainer != null)
	{
		itemContainer = percentFullStorageContainer.inventory;
	}
	if (itemContainer == null)
	{
		EndEmptyProcess(CoalingTower.ActionAttemptStatus.GenericError);
		return;
	}
	ItemContainer inventory = storageContainer.inventory;
	ItemContainer newcontainer = itemContainer;
	int iAmount = UnityEngine.Mathf.RoundToInt((float)lootOption.maxLootAmount / 10f);
	System.Collections.Generic.List<Item> obj = Facepunch.Pool.Get<System.Collections.Generic.List<Item>>();
	int num = inventory.Take(obj, lootOption.lootItem.itemid, iAmount);
	bool flag2 = true;
	if (num > 0)
	{
		foreach (Item item in obj)
		{
			if (tcUnloadingNow.wagonType == TrainCarUnloadable.WagonType.Lootboxes)
			{
				item.Remove();
				continue;
			}
			bool flag3 = item.MoveToContainer(newcontainer);
			if (!flag2 || flag3)
			{
				continue;
			}
			item.MoveToContainer(inventory);
			flag2 = false;
			break;
		}
	}
	Facepunch.Pool.Free(ref obj, freeElements: false);
	float orePercent = tcUnloadingNow.GetOrePercent();
	if (orePercent == 0f)
	{
		EndEmptyProcess(CoalingTower.ActionAttemptStatus.NoError);
	}
	else if (!flag2)
	{
		EndEmptyProcess(CoalingTower.ActionAttemptStatus.OutputIsFull);
	}
	else if (flag)
	{
		tcUnloadingNow.SetVisualOreLevel(orePercent);
	}
}

```
:::
