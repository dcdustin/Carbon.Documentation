<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDispenserBonus
```csharp
public void AssignFinishBonus(BasePlayer player, float fraction, AttackEntity weapon)
{
	if (forceFullFinishBonus)
	{
		fraction = 1f;
	}
	SendMessage("FinishBonusAssigned", UnityEngine.SendMessageOptions.DontRequireReceiver);
	if (fraction <= 0f || finishBonus == null)
	{
		return;
	}
	foreach (ItemAmount finishBonu in finishBonus)
	{
		int num = UnityEngine.Mathf.CeilToInt((float)(int)finishBonu.amount * UnityEngine.Mathf.Clamp01(fraction));
		int num2 = CalculateGatherBonus(player, finishBonu, num);
		Item item = ItemManager.Create(finishBonu.itemDef, num + num2, 0uL);
		if (item != null)
		{
			ApplyItemOwnership(player, item);
			Facepunch.Rust.Analytics.Azure.OnGatherItem(item.info.shortname, item.amount, base.baseEntity, player, weapon);
			player.GiveItem(item, BaseEntity.GiveItemReason.ResourceHarvested);
		}
	}
}

```
