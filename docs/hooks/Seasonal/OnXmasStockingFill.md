# OnXmasStockingFill
<Badge type="info" text="Seasonal"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a Christmas stocking is being filled with loot items.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnXmasStockingFill(Stocking stocking)
{
	Puts("OnXmasStockingFill has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ Stocking]
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
:::
