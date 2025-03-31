<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFuelCheck
```csharp
public bool HasFuel(bool forceCheck = false)
{
	if (UnityEngine.Time.time > nextFuelCheckTime || forceCheck)
	{
		cachedHasFuel = (float)GetFuelAmount() > 0f;
		nextFuelCheckTime = UnityEngine.Time.time + UnityEngine.Random.Range(1f, 2f);
	}
	return cachedHasFuel;
}

```
