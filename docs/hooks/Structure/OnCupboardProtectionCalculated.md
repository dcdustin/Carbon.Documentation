<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCupboardProtectionCalculated
```csharp
public float GetProtectedMinutes(bool force = false)
{
	if (base.isServer)
	{
		if (!force && UnityEngine.Time.realtimeSinceStartup < nextProtectedCalcTime)
		{
			return cachedProtectedMinutes;
		}
		nextProtectedCalcTime = UnityEngine.Time.realtimeSinceStartup + 60f;
		System.Collections.Generic.List<ItemAmount> obj = Facepunch.Pool.Get<System.Collections.Generic.List<ItemAmount>>();
		CalculateUpkeepCostAmounts(obj);
		float num = CalculateUpkeepPeriodMinutes();
		float num2 = -1f;
		if (base.inventory != null)
		{
			foreach (ItemAmount item in obj)
			{
				int num3 = System.Linq.Enumerable.Sum(base.inventory.FindItemsByItemID(item.itemid), (Item x) => x.amount);
				if (num3 > 0 && item.amount > 0f)
				{
					float num4 = (float)num3 / item.amount * num;
					if (num2 == -1f || num4 < num2)
					{
						num2 = num4;
					}
				}
				else
				{
					num2 = 0f;
				}
			}
			if (num2 == -1f)
			{
				num2 = 0f;
			}
		}
		Facepunch.Pool.FreeUnmanaged(ref obj);
		cachedProtectedMinutes = num2;
		return cachedProtectedMinutes;
	}
	return 0f;
}

```
