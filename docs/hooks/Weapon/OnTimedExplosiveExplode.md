<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTimedExplosiveExplode
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTimedExplosiveExplode()
{
	Puts("OnTimedExplosiveExplode has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ TimedExplosive]
public virtual void Explode()
{
	Explode(PivotPoint());
}

```
:::
