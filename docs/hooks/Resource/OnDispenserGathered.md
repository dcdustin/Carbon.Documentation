<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDispenserGathered
```csharp
public void GiveResourceFromItem(BasePlayer entity, ItemAmount itemAmt, float gatherDamage, float destroyFraction, AttackEntity attackWeapon)
{
	if (itemAmt.amount == 0f)
	{
		return;
	}
	float num = UnityEngine.Mathf.Min(gatherDamage, base.baseEntity.Health()) / base.baseEntity.MaxHealth();
	float num2 = itemAmt.startAmount / startingItemCounts;
	float f = UnityEngine.Mathf.Clamp(itemAmt.startAmount * num / num2, 0f, itemAmt.amount);
	f = UnityEngine.Mathf.Round(f);
	float num3 = f * destroyFraction * 2f;
	if (itemAmt.amount <= f + num3)
	{
		float num4 = (f + num3) / itemAmt.amount;
		f /= num4;
		num3 /= num4;
	}
	itemAmt.amount -= UnityEngine.Mathf.Floor(f);
	itemAmt.amount -= UnityEngine.Mathf.Floor(num3);
	if (f < 1f)
	{
		f = ((UnityEngine.Random.Range(0f, 1f) <= f) ? 1f : 0f);
		itemAmt.amount = 0f;
	}
	if (itemAmt.amount < 0f)
	{
		itemAmt.amount = 0f;
	}
	if (f >= 1f)
	{
		int num5 = CalculateGatherBonus(entity, itemAmt, f);
		int iAmount = UnityEngine.Mathf.FloorToInt(f) + num5;
		Item item = ItemManager.CreateByItemID(itemAmt.itemid, iAmount, 0uL);
		if (item != null)
		{
			ApplyItemOwnership(entity, item);
			OverrideOwnership(item, attackWeapon);
			Facepunch.Rust.Analytics.Azure.OnGatherItem(item.info.shortname, item.amount, base.baseEntity, entity, attackWeapon);
			entity.GiveItem(item, BaseEntity.GiveItemReason.ResourceHarvested);
		}
	}
}

```
