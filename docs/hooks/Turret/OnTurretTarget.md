# OnTurretTarget
<Badge type="info" text="Turret"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an auto turret acquires or changes a target.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTurretTarget(AutoTurret autoTurret)
{
	Puts("OnTurretTarget has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ AutoTurret]
public void SetTarget(BaseCombatEntity targ)
{
	if (targ != target || targ.IsRealNull() != target.IsRealNull())
	{
		Effect.server.Run((targ == null) ? targetLostEffect.resourcePath : targetAcquiredEffect.resourcePath, base.transform.position, UnityEngine.Vector3.up);
		if (outputs != null && outputs.Length != 0 && outputs[0].connectedTo.Get() != null)
		{
			MarkDirtyForceUpdateOutputs();
		}
		nextShotTime += 0.1f;
		authDirty = true;
	}
	target = targ;
}

```
:::
