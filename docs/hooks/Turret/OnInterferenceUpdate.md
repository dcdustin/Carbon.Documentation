<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInterferenceUpdate
```csharp
public void UpdateInterference()
{
	if (!IsOn())
	{
		return;
	}
	float num = 0f;
	foreach (AutoTurret nearbyTurret in nearbyTurrets)
	{
		if (!nearbyTurret.isClient && nearbyTurret.IsValid() && nearbyTurret.gameObject.activeSelf && !nearbyTurret.EqualNetID(net.ID) && nearbyTurret.IsOn() && !nearbyTurret.HasInterference())
		{
			num += 1f;
		}
	}
	SetFlag(BaseEntity.Flags.OnFire, num >= (float)ConVar.Sentry.maxinterference);
}

```
