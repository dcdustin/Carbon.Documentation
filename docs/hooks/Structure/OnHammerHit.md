# OnHammerHit
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnHammerHit(BasePlayer local0, HitInfo info)
{
	Puts("OnHammerHit has been fired!");
	return (object)default;
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
