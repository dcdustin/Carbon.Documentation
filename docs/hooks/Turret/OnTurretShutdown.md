<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTurretShutdown
```csharp
public void InitiateShutdown()
{
	if (!IsOffline() || booting)
	{
		CancelInvoke(SetOnline);
		booting = false;
		Effect.server.Run(offlineSound.resourcePath, this, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
		SetIsOnline(online: false);
	}
}

```
