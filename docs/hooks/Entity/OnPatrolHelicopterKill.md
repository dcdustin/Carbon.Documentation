<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPatrolHelicopterKill
```csharp
public override void Hurt(HitInfo info)
{
	bool flag = false;
	if (info.damageTypes.Total() >= base.health)
	{
		base.health = 10000f;
		myAI.CriticalDamage();
		flag = true;
	}
	base.Hurt(info);
	if (flag)
	{
		return;
	}
	myAI.OtherDamaged(info);
	PatrolHelicopter.weakspot[] array = weakspots;
	foreach (PatrolHelicopter.weakspot weakspot in array)
	{
		string[] bonenames = weakspot.bonenames;
		foreach (string str in bonenames)
		{
			if (info.HitBone == StringPool.Get(str))
			{
				weakspot.Hurt(info.damageTypes.Total(), info);
				myAI.WeakspotDamaged(weakspot, info);
			}
		}
	}
}

```
