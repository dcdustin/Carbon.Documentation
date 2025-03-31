<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerAttack [melee, patch]
```csharp
public virtual void DoAttackShared(HitInfo info)
{
	GetAttackStats(info);
	if (info.HitEntity != null)
	{
		using (TimeWarning.New("OnAttacked", 50))
		{
			info.HitEntity.OnAttacked(info);
		}
	}
	if (info.DoHitEffects)
	{
		if (base.isServer)
		{
			using (TimeWarning.New("ImpactEffect", 20))
			{
				Effect.server.ImpactEffect(info);
			}
		}
		else
		{
			using (TimeWarning.New("ImpactEffect", 20))
			{
				Effect.client.ImpactEffect(info);
			}
		}
	}
	if (base.isServer && !base.IsDestroyed)
	{
		using (TimeWarning.New("UpdateItemCondition", 50))
		{
			UpdateItemCondition(info);
		}
		StartAttackCooldown(repeatDelay);
	}
}

```
