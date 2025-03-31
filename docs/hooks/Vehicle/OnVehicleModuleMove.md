# OnVehicleModuleMove
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnVehicleModuleMove()
{
	Puts("OnVehicleModuleMove has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseModularVehicle]
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
:::
