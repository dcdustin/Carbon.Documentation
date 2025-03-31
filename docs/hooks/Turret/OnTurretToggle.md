<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTurretToggle
```csharp
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
