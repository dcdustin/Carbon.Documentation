# OnStructureRepair
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnStructureRepair(BaseCombatEntity baseCombatEntity)
{
	Puts("OnStructureRepair has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseCombatEntity]
public virtual void DoRepair(BasePlayer player)
{
	if (!repair.enabled)
	{
		return;
	}
	float num = GetDamageRepairCooldown();
	if (player.IsInCreativeMode && ConVar.Creative.freeRepair)
	{
		num = 0f;
	}
	if (SecondsSinceAttacked <= num)
	{
		OnRepairFailed(player, RecentlyDamagedError, (num - SecondsSinceAttacked).ToString("N0"));
		return;
	}
	float num2 = MaxHealth() - Health();
	float num3 = num2 / MaxHealth();
	if (num2 <= 0f || num3 <= 0f)
	{
		OnRepairFailed(player, NotDamagedError);
		return;
	}
	System.Collections.Generic.List<ItemAmount> list = RepairCost(num3);
	if (list == null)
	{
		return;
	}
	float num4 = System.Linq.Enumerable.Sum(list, (ItemAmount x) => x.amount);
	float healthBefore = health;
	if (player.IsInCreativeMode && ConVar.Creative.freeRepair)
	{
		num4 = 0f;
	}
	if (num4 > 0f)
	{
		float num5 = System.Linq.Enumerable.Min(list, (ItemAmount x) => UnityEngine.Mathf.Clamp01((float)player.inventory.GetAmount(x.itemid) / x.amount));
		if (float.IsNaN(num5))
		{
			num5 = 0f;
		}
		num5 = UnityEngine.Mathf.Min(num5, 50f / num2);
		if (num5 <= 0f)
		{
			OnRepairFailedResources(player, list);
			return;
		}
		int num6 = 0;
		foreach (ItemAmount item in list)
		{
			int amount = UnityEngine.Mathf.CeilToInt(num5 * item.amount);
			int num7 = player.inventory.Take(null, item.itemid, amount);
			Facepunch.Rust.Analytics.Azure.LogResource(Facepunch.Rust.Analytics.Azure.ResourceMode.Consumed, "repair_entity", item.itemDef.shortname, num7, this, null, safezone: false, null, player.userID);
			if (num7 > 0)
			{
				num6 += num7;
				player.Command("note.inv", item.itemid, num7 * -1);
			}
		}
		float num8 = (float)num6 / num4;
		health += num2 * num8;
		SendNetworkUpdate();
	}
	else
	{
		health += num2;
		SendNetworkUpdate();
	}
	Facepunch.Rust.Analytics.Azure.OnEntityRepaired(player, this, healthBefore, health);
	if (Health() >= MaxHealth())
	{
		OnRepairFinished();
	}
	else
	{
		OnRepair();
	}
}

```
:::
