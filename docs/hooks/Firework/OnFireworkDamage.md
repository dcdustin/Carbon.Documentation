# OnFireworkDamage
<Badge type="info" text="Firework"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a firework is damaged by an attack.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnFireworkDamage(BaseFirework baseFirework)
{
	Puts("OnFireworkDamage has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseFirework]
public override void OnAttacked(HitInfo info)
{
	base.OnAttacked(info);
	if (base.isServer && info.damageTypes.Has(Rust.DamageType.Heat))
	{
		StaggeredTryLightFuse();
	}
}

```
:::
