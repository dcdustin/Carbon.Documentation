<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNearbyTurretsScan
```csharp
public void UpdateNearbyTurrets(bool created)
{
	System.Collections.Generic.List<AutoTurret> obj = Facepunch.Pool.Get<System.Collections.Generic.List<AutoTurret>>();
	Vis.Entities(base.transform.position, ConVar.Sentry.interferenceradius, obj, 256, UnityEngine.QueryTriggerInteraction.Ignore);
	foreach (AutoTurret item in obj)
	{
		if (!(item == this))
		{
			if (created)
			{
				nearbyTurrets.Add(item);
				item.nearbyTurrets.Add(this);
			}
			else
			{
				item.nearbyTurrets.Remove(this);
			}
		}
	}
	if (!created)
	{
		nearbyTurrets.Clear();
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
}

```
