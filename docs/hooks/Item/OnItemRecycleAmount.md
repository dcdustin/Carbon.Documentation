# OnItemRecycleAmount
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when calculating the output from recycling an item.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemRecycleAmount(Item local3, int local4, Recycler recycler)
{
	Puts("OnItemRecycleAmount has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Recycler]
public void RecycleThink()
{
	bool flag = false;
	float num = (IsSafezoneRecycler() ? safezoneRecycleEfficiency : radtownRecycleEfficiency);
	for (int i = 0; i < 6; i++)
	{
		Item slot = base.inventory.GetSlot(i);
		if (!CanBeRecycled(slot))
		{
			continue;
		}
		if (slot.hasCondition)
		{
			num = UnityEngine.Mathf.Clamp01(num * UnityEngine.Mathf.Clamp(slot.conditionNormalized * slot.maxConditionNormalized, 0.1f, 1f));
		}
		int num2 = 1;
		if (slot.amount > 1)
		{
			num2 = UnityEngine.Mathf.CeilToInt(UnityEngine.Mathf.Min(slot.amount, (float)slot.MaxStackable() * 0.1f));
		}
		if (slot.info.Blueprint.scrapFromRecycle > 0)
		{
			float num3 = slot.info.Blueprint.scrapFromRecycle * num2;
			if (slot.MaxStackable() == 1 && slot.hasCondition)
			{
				num3 *= slot.conditionNormalized;
			}
			float num4 = num / 0.5f;
			num3 *= num4;
			int num5 = UnityEngine.Mathf.FloorToInt(num3);
			float num6 = num3 - (float)num5;
			scrapRemainder += num6;
			if (scrapRemainder >= 1f)
			{
				int num7 = UnityEngine.Mathf.FloorToInt(scrapRemainder);
				scrapRemainder -= num7;
				num5 += num7;
			}
			if (num5 >= 1)
			{
				Item item = ItemManager.CreateByName("scrap", num5, 0uL);
				if (base.LastLootedByPlayer != null)
				{
					item.SetItemOwnership(base.LastLootedByPlayer, ItemOwnershipPhrases.Recycler);
				}
				Facepunch.Rust.Analytics.Azure.OnRecyclerItemProduced(item.info.shortname, item.amount, this, slot);
				MoveItemToOutput(item);
			}
		}
		if (!string.IsNullOrEmpty(slot.info.Blueprint.RecycleStat))
		{
			System.Collections.Generic.List<BasePlayer> obj = Facepunch.Pool.Get<System.Collections.Generic.List<BasePlayer>>();
			Vis.Entities(base.transform.position, 3f, obj, 131072);
			foreach (BasePlayer item3 in obj)
			{
				if (item3.IsAlive() && !item3.IsSleeping() && item3.inventory.loot.entitySource == this)
				{
					item3.stats.Add(slot.info.Blueprint.RecycleStat, num2, (Stats)5);
					item3.stats.Save();
				}
			}
			Facepunch.Pool.FreeUnmanaged(ref obj);
		}
		Facepunch.Rust.Analytics.Azure.OnItemRecycled(slot.info.shortname, num2, this);
		slot.UseItem(num2);
		foreach (ItemAmount ingredient in slot.info.Blueprint.GetIngredients())
		{
			if (ingredient.itemDef.shortname == "scrap")
			{
				continue;
			}
			float num8 = ingredient.amount / (float)slot.info.Blueprint.amountToCreate * num * (float)num2;
			int num9 = UnityEngine.Mathf.FloorToInt(num8);
			float num10 = num8 - (float)num9;
			if (num10 > float.Epsilon && UnityEngine.Random.Range(0f, 1f) <= num10)
			{
				num9++;
			}
			if (num9 <= 0)
			{
				continue;
			}
			int num11 = UnityEngine.Mathf.CeilToInt((float)num9 / (float)ingredient.itemDef.stackable);
			for (int j = 0; j < num11; j++)
			{
				if (ingredient.itemDef.IsAllowedInEra(Rust.EraRestriction.Recycle))
				{
					int num12 = ((num9 > ingredient.itemDef.stackable) ? ingredient.itemDef.stackable : num9);
					Item item2 = ItemManager.Create(ingredient.itemDef, num12, 0uL);
					if (base.LastLootedByPlayer != null)
					{
						item2.SetItemOwnership(base.LastLootedByPlayer, ItemOwnershipPhrases.Recycler);
					}
					Facepunch.Rust.Analytics.Azure.OnRecyclerItemProduced(item2.info.shortname, item2.amount, this, slot);
					if (!MoveItemToOutput(item2))
					{
						flag = true;
					}
					num9 -= num12;
					if (num9 <= 0)
					{
						break;
					}
				}
			}
		}
		break;
	}
	if (flag || !HasRecyclable())
	{
		StopRecycling();
	}
}

```
:::
