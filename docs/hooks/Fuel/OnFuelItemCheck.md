# OnFuelItemCheck
<Badge type="info" text="Fuel"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when retrieving the fuel item from an entity.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private Item OnFuelItemCheck(EntityFuelSystem entityFuelSystem, StorageContainer local0)
{
	Puts("OnFuelItemCheck has been fired!");
	return (Item)default;
}
```
```csharp [Source — Assembly-CSharp @ EntityFuelSystem]
public Item GetFuelItem()
{
	StorageContainer fuelContainer = GetFuelContainer();
	if (fuelContainer == null)
	{
		return null;
	}
	return fuelContainer.inventory.GetSlot(0);
}

```
:::
