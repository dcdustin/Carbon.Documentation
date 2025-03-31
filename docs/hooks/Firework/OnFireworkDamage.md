<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFireworkDamage
```csharp
public override void OnAttacked(HitInfo info)
{
	base.OnAttacked(info);
	if (base.isServer && info.damageTypes.Has(Rust.DamageType.Heat))
	{
		StaggeredTryLightFuse();
	}
}

```
