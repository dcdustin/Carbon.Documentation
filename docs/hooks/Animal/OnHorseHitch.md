<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHorseHitch
```csharp
public bool AttemptToHitch(HitchTrough.IHitchable hitchable, HitchTrough.HitchSpot spot = null)
{
	if (hitchable == null)
	{
		return false;
	}
	if (spot == null)
	{
		BaseEntity baseEntity = hitchable as BaseEntity;
		if (baseEntity != null)
		{
			spot = GetClosestSpot(baseEntity.transform.position);
		}
	}
	if (spot != null)
	{
		spot.SetOccupiedBy(hitchable);
		hitchable.SetHitch(this, spot);
		return true;
	}
	return false;
}

```
