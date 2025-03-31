# OnInterferenceUpdate
<Badge type="info" text="Turret"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnInterferenceUpdate()
{
	Puts("OnInterferenceUpdate has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ AutoTurret]
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
:::
