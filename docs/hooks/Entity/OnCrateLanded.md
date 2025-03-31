<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCrateLanded
```csharp
public void LandCheck()
{
	if (!hasLanded && UnityEngine.Physics.Raycast(new UnityEngine.Ray(base.transform.position + UnityEngine.Vector3.up * 0.5f, UnityEngine.Vector3.down), out var hitInfo, 1f, 1084293377))
	{
		Effect.server.Run(landEffect.resourcePath, hitInfo.point, UnityEngine.Vector3.up);
		hasLanded = true;
		CancelInvoke(LandCheck);
	}
}

```
