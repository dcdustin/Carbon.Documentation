# OnOvenCooked
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after an item has been cooked in an oven/furnace (item finished cooking).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnOvenCooked()
{
	Puts("OnOvenCooked has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseOven]
public void Cook()
{
	if (HasFlag(BaseEntity.Flags.Reserved8))
	{
		return;
	}
	Item item = FindBurnable();
	if (item == null && !CanRunWithNoFuel)
	{
		StopCooking();
		return;
	}
	foreach (Item item2 in base.inventory.itemList)
	{
		if (item2.position >= _inputSlotIndex && item2.position < _inputSlotIndex + inputSlots && !item2.HasFlag(Item.Flag.Cooking))
		{
			item2.SetFlag(Item.Flag.Cooking, b: true);
			item2.MarkDirty();
		}
	}
	IncreaseCookTime(0.5f * GetSmeltingSpeed());
	BaseEntity slot = GetSlot(BaseEntity.Slot.FireMod);
	if ((bool)slot)
	{
		slot.SendMessage("Cook", 0.5f, UnityEngine.SendMessageOptions.DontRequireReceiver);
	}
	if (item != null)
	{
		ItemModBurnable itemModBurnable = item.info.ItemModBurnable;
		item.fuel -= 0.5f * (cookingTemperature / 200f);
		if (!item.HasFlag(Item.Flag.OnFire))
		{
			item.SetFlag(Item.Flag.OnFire, b: true);
			item.MarkDirty();
		}
		if (item.fuel <= 0f)
		{
			ConsumeFuel(item, itemModBurnable);
		}
	}
	OnCooked();
}

```
:::
