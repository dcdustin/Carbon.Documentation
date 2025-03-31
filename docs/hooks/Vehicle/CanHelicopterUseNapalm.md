<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanHelicopterUseNapalm
```csharp
public bool CanUseNapalm()
{
	return UnityEngine.Time.realtimeSinceStartup - lastNapalmTime >= UnityEngine.Random.Range(25f, 35f);
}

```
