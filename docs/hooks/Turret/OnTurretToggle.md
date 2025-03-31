# OnTurretToggle
<Badge type="info" text="Turret"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTurretToggle(AutoTurret autoTurret)
{
	Puts("OnTurretToggle has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ AutoTurret]
public void SetIsOnline(bool online)
{
	if (online != IsOn())
	{
		SetFlag(BaseEntity.Flags.On, online);
		if (online)
		{
			TryRegisterForInterferenceUpdate();
		}
		else
		{
			SetFlag(BaseEntity.Flags.OnFire, b: false);
			UpdateInterferenceOnOthers();
		}
		booting = false;
		GetAttachedWeapon()?.SetLightsOn(online);
		SendNetworkUpdate();
		if (IsOffline())
		{
			SetTarget(null);
			isLootable = true;
		}
		else
		{
			isLootable = false;
			authDirty = true;
		}
	}
}

```
:::
