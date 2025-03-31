<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnImpactEffectCreate
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
