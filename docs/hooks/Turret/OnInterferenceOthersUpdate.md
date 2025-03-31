<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInterferenceOthersUpdate
```csharp
public void UpdateInterferenceOnOthers()
{
	foreach (AutoTurret nearbyTurret in nearbyTurrets)
	{
		if (nearbyTurret != null)
		{
			nearbyTurret.TryRegisterForInterferenceUpdate();
		}
	}
}

```
