# OnTurretStartup
<Badge type="info" text="Turret"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTurretStartup(AutoTurret autoTurret)
{
	Puts("OnTurretStartup has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ AutoTurret]
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
:::
