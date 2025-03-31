<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanWaterBallSplash
```csharp
public static bool DoSplash(UnityEngine.Vector3 position, float radius, ItemDefinition liquidDef, int amount)
{
	System.Collections.Generic.List<BaseEntity> obj = Facepunch.Pool.Get<System.Collections.Generic.List<BaseEntity>>();
	Vis.Entities(position, radius, obj, 1220225811);
	int num = 0;
	int num2 = amount;
	bool flag = false;
	while (amount > 0 && num < 3)
	{
		System.Collections.Generic.List<ISplashable> obj2 = Facepunch.Pool.Get<System.Collections.Generic.List<ISplashable>>();
		foreach (BaseEntity item in obj)
		{
			if (item.isClient || !(item is ISplashable splashable) || obj2.Contains(splashable) || !splashable.WantsSplash(liquidDef, amount))
			{
				continue;
			}
			bool flag2 = true;
			if (item is PlanterBox)
			{
				if (!GamePhysics.LineOfSight(item.transform.position + new UnityEngine.Vector3(0f, 1f, 0f), position, 2097152))
				{
					flag2 = false;
				}
				if (flag2)
				{
					flag = true;
				}
			}
			if (flag2)
			{
				obj2.Add(splashable);
			}
		}
		if (obj2.Count == 0)
		{
			break;
		}
		int b = UnityEngine.Mathf.CeilToInt(amount / obj2.Count);
		foreach (ISplashable item2 in obj2)
		{
			if (!flag || !(item2 is BasePlayer))
			{
				int num3 = item2.DoSplash(liquidDef, UnityEngine.Mathf.Min(amount, b));
				amount -= num3;
				if (amount <= 0)
				{
					break;
				}
			}
		}
		Facepunch.Pool.FreeUnmanaged(ref obj2);
		num++;
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
	return amount < num2;
}

```
