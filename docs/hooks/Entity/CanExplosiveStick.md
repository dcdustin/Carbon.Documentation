<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanExplosiveStick
```csharp
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
