<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHelicopterAttack
```csharp
public override void OnAttacked(HitInfo info)
{
	base.OnAttacked(info);
	InitiateAnger();
	SetFlag(BaseEntity.Flags.Reserved9, base.healthFraction <= 0.8f);
	SetFlag(BaseEntity.Flags.OnFire, base.healthFraction <= 0.33f);
}

```
