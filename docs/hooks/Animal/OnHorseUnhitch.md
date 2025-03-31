<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHorseUnhitch
```csharp
public void UnHitch(HitchTrough.IHitchable hitchable)
{
	HitchTrough.HitchSpot[] array = hitchSpots;
	foreach (HitchTrough.HitchSpot hitchSpot in array)
	{
		if (hitchSpot.GetHitchable(base.isServer) == hitchable)
		{
			hitchSpot.SetOccupiedBy(null);
			hitchable.SetHitch(null, null);
		}
	}
}

```
