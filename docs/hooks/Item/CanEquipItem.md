# CanEquipItem
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Determines if a player can equip a given item (hold it in their hands).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanEquipItem(PlayerInventory playerInventory)
{
	Puts("CanEquipItem has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerInventory]
public bool CanEquipItem(Item item, int targetSlot)
{
	if ((item.info.flags & ItemDefinition.Flag.NotAllowedInBelt) != 0)
	{
		return false;
	}
	if (base.baseEntity != null && base.baseEntity.IsRestrained)
	{
		Handcuffs restraintItem = base.baseEntity.Belt.GetRestraintItem();
		if (restraintItem != null && restraintItem.GetItem().position == targetSlot)
		{
			return false;
		}
	}
	ItemModContainerRestriction component = item.info.GetComponent<ItemModContainerRestriction>();
	if (component == null)
	{
		return true;
	}
	Item[] array = containerBelt.itemList.ToArray();
	foreach (Item item2 in array)
	{
		if (item2 != item)
		{
			ItemModContainerRestriction component2 = item2.info.GetComponent<ItemModContainerRestriction>();
			if (!(component2 == null) && !component.CanExistWith(component2) && !item2.MoveToContainer(containerMain))
			{
				item2.Drop(base.baseEntity.GetDropPosition(), base.baseEntity.GetDropVelocity());
			}
		}
	}
	return true;
}

```
:::
