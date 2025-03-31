<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInterferenceOthersUpdate
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnInterferenceOthersUpdate()
{
	Puts("OnInterferenceOthersUpdate has been fired!");
	return (System.Object)default;
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
