# OnImpactEffectCreate
<Badge type="info" text="Weapon"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnImpactEffectCreate()
{
	Puts("OnImpactEffectCreate has been fired!");
	return (System.Object)default;
}
```
:::
