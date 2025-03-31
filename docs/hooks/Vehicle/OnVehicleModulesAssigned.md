# OnVehicleModulesAssigned
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnVehicleModulesAssigned(ModularCar modularCar, Rust.Modular.ItemModVehicleModule[] socketItemDefs)
{
	Puts("OnVehicleModulesAssigned has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ModularCar]
public void SpawnPreassignedModules()
{
	if (!spawnSettings.useSpawnSettings || spawnSettings.configurationOptions.IsNullOrEmpty())
	{
		return;
	}
	ModularCarPresetConfig modularCarPresetConfig = spawnSettings.configurationOptions[UnityEngine.Random.Range(0, spawnSettings.configurationOptions.Length)];
	for (int i = 0; i < modularCarPresetConfig.socketItemDefs.Length; i++)
	{
		Rust.Modular.ItemModVehicleModule itemModVehicleModule = modularCarPresetConfig.socketItemDefs[i];
		if (itemModVehicleModule != null && base.Inventory.SocketsAreFree(i, itemModVehicleModule.socketsTaken))
		{
			Item item = ItemManager.Create(itemModVehicleModule.GetComponent<ItemDefinition>(), 1, 0uL);
			float num = UnityEngine.Random.Range(spawnSettings.minStartHealthPercent, spawnSettings.maxStartHealthPercent);
			item.condition = item.maxCondition * num;
			if (!TryAddModule(item))
			{
				item.Remove();
			}
		}
	}
	Invoke(HandleAdminBonus, 0f);
}

```
:::
