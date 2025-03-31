<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnVehicleModuleMove
```csharp
public bool CanMoveFrom(BasePlayer player, Item item)
{
	BaseVehicleModule moduleForItem = GetModuleForItem(item);
	if (moduleForItem != null)
	{
		return moduleForItem.CanBeMovedNow();
	}
	return true;
}

```
