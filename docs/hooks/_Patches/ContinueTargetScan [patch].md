<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# ContinueTargetScan [patch]
```csharp
public void TargetScan()
{
	if (!target.IsRealNull() && (target == null || target.IsDead() || UnityEngine.Time.realtimeSinceStartup - lastTargetSeenTime > 3f || UnityEngine.Vector3.Distance(base.transform.position, target.transform.position) > sightRange || (PeacekeeperMode() && !IsEntityHostile(target))))
	{
		SetTarget(null);
	}
	if (!authDirty && !hasPotentialUnauthedTarget)
	{
		return;
	}
	if (HasInterference())
	{
		if (HasTarget())
		{
			SetTarget(null);
		}
		return;
	}
	hasPotentialUnauthedTarget = false;
	authDirty = false;
	if (HasTarget() || IsOffline() || IsBeingControlled)
	{
		return;
	}
	if (targetTrigger.entityContents != null)
	{
		foreach (BaseEntity entityContent in targetTrigger.entityContents)
		{
			BaseCombatEntity baseCombatEntity = entityContent as BaseCombatEntity;
			if (baseCombatEntity == null)
			{
				continue;
			}
			if (!ConVar.Sentry.targetall)
			{
				BasePlayer basePlayer = baseCombatEntity as BasePlayer;
				if (basePlayer != null && (IsAuthed(basePlayer) || Ignore(basePlayer)))
				{
					continue;
				}
			}
			if (!hasPotentialUnauthedTarget)
			{
				hasPotentialUnauthedTarget = true;
			}
			if ((!PeacekeeperMode() || IsEntityHostile(baseCombatEntity)) && baseCombatEntity.IsAlive() && ShouldTarget(baseCombatEntity) && InFiringArc(baseCombatEntity) && ObjectVisible(baseCombatEntity))
			{
				SetTarget(baseCombatEntity);
				break;
			}
		}
	}
	if (PeacekeeperMode() && target == null)
	{
		nextShotTime = UnityEngine.Time.time + 1f;
	}
}

```
