<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTurretStartup
```csharp
public void InitiateStartup()
{
	if (!IsOnline() && !booting)
	{
		Effect.server.Run(onlineSound.resourcePath, this, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
		Invoke(SetOnline, 2f);
		booting = true;
	}
}

```
