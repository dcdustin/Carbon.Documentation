<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHammerHit
```csharp
public override void DoAttackShared(HitInfo info)
{
	BasePlayer ownerPlayer = GetOwnerPlayer();
	BaseCombatEntity baseCombatEntity = info.HitEntity as BaseCombatEntity;
	if (baseCombatEntity != null && ownerPlayer != null && base.isServer)
	{
		using (TimeWarning.New("DoRepair", 50))
		{
			baseCombatEntity.DoRepair(ownerPlayer);
		}
	}
	info.DoDecals = false;
	if (base.isServer)
	{
		Effect.server.ImpactEffect(info);
	}
	else
	{
		Effect.client.ImpactEffect(info);
	}
}

```
