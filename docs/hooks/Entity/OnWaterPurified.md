# OnWaterPurified
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after water has been purified in a Water Purifier (clean water produced).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnWaterPurified(WaterPurifier waterPurifier)
{
	Puts("OnWaterPurified has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ WaterPurifier]
public void ConvertWater(float timeCooked)
{
	if (stopWhenOutputFull)
	{
		Item slot = waterStorage.inventory.GetSlot(0);
		if (slot != null && slot.amount >= slot.MaxStackable())
		{
			return;
		}
	}
	float num = timeCooked * ((float)waterToProcessPerMinute / 60f);
	dirtyWaterProcssed += num;
	if (dirtyWaterProcssed >= 1f)
	{
		Item slot2 = base.inventory.GetSlot(0);
		int num2 = UnityEngine.Mathf.Min(UnityEngine.Mathf.FloorToInt(dirtyWaterProcssed), slot2.amount);
		num = num2;
		slot2.UseItem(num2);
		dirtyWaterProcssed -= num2;
		SendNetworkUpdate();
	}
	pendingFreshWater += num / (float)freshWaterRatio;
	if (!(pendingFreshWater >= 1f))
	{
		return;
	}
	int num3 = UnityEngine.Mathf.FloorToInt(pendingFreshWater);
	pendingFreshWater -= num3;
	Item slot3 = waterStorage.inventory.GetSlot(0);
	if (slot3 != null && slot3.info != freshWater)
	{
		slot3.RemoveFromContainer();
		slot3.Remove();
	}
	if (slot3 == null)
	{
		Item item = ItemManager.Create(freshWater, num3, 0uL);
		if (!item.MoveToContainer(waterStorage.inventory))
		{
			item.Remove();
		}
	}
	else
	{
		slot3.amount += num3;
		slot3.amount = UnityEngine.Mathf.Clamp(slot3.amount, 0, waterStorage.maxStackSize);
		waterStorage.inventory.MarkDirty();
	}
	waterStorage.SendNetworkUpdate();
}

```
:::
