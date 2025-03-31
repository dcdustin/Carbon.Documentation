# OnInterferenceOthersUpdate
<Badge type="info" text="Turret"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnInterferenceOthersUpdate(AutoTurret autoTurret)
{
	Puts("OnInterferenceOthersUpdate has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ AutoTurret]
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
:::
