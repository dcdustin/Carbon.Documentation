<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnXmasStockingFill
```csharp
public override void SpawnLoot()
{
	if (base.inventory == null)
	{
		UnityEngine.Debug.Log("CONTACT DEVELOPERS! Stocking::PopulateLoot has null inventory!!! " + base.name);
	}
	else if (IsEmpty())
	{
		base.SpawnLoot();
		SetFlag(BaseEntity.Flags.On, b: true);
		Hurt(MaxHealth() * 0.1f, Rust.DamageType.Generic, null, useProtection: false);
	}
}

```
