# CanExplosiveStick
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an explosive (e.g., C4) is about to stick to a surface on throw. Plugins can allow or prevent it from sticking.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanExplosiveStick()
{
	Puts("CanExplosiveStick has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ TimedExplosive]
public virtual bool CanStickTo(BaseEntity entity)
{
	if (entity.TryGetComponent<DecorDeployable>(out var _))
	{
		return false;
	}
	if (entity is Drone)
	{
		return false;
	}
	if (entity is TravellingVendor)
	{
		return false;
	}
	return true;
}

```
:::
