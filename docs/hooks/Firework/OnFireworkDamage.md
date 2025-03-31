<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFireworkDamage
Called when a firework is damaged by an attack.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnFireworkDamage()
{
	Puts("OnFireworkDamage has been fired!");
	return (System.Object)default;
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
