# OnHorseHitch
<Badge type="info" text="Animal"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a horse is being hitched to a hitching post (attempting to tie a horse to a trough).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnHorseHitch()
{
	Puts("OnHorseHitch has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ HitchTrough]
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
:::
