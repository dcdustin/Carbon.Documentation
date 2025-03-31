# OnTurretShutdown
<Badge type="info" text="Turret"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTurretShutdown()
{
	Puts("OnTurretShutdown has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ AutoTurret]
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
:::
