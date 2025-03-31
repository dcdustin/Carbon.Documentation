<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInventoryItemsCount
Called when counting the total amount of a specific item in an inventory.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private int OnInventoryItemsCount()
{
	Puts("OnInventoryItemsCount has been fired!");
	return (System.Int32)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerInventory]
public int GetAmount(ItemDefinition definition)
{
	if (!(definition != null))
	{
		return 0;
	}
	return GetAmount(definition.itemid);
}

```
:::
