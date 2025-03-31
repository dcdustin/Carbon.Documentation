# OnInterferenceUpdate
<Badge type="info" text="Turret"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnInterferenceUpdate(AutoTurret autoTurret)
{
	Puts("OnInterferenceUpdate has been fired!");
	return (object)default;
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
