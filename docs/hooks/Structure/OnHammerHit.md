# OnHammerHit
<Badge type="info" text="Structure"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnHammerHit()
{
	Puts("OnHammerHit has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ Hammer]
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
:::
