<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFuelItemCheck
Called when retrieving the fuel item from an entity.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private Item OnFuelItemCheck()
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
