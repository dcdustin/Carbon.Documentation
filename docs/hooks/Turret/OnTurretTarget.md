<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTurretTarget
```csharp
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
