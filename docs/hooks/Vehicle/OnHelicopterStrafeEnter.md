<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHelicopterStrafeEnter
```csharp
public void StartStrafe(BasePlayer strafeTarget, bool shouldUseNapalm = false)
{
	strafe_target = strafeTarget;
	get_out_of_strafe_distance = UnityEngine.Random.Range(13f, 17f);
	if (CanUseNapalm() && shouldUseNapalm)
	{
		passNapalm = shouldUseNapalm;
		useNapalm = true;
		lastNapalmTime = UnityEngine.Time.realtimeSinceStartup;
	}
	lastStrafeTime = UnityEngine.Time.realtimeSinceStartup;
	_currentState = PatrolHelicopterAI.aiState.STRAFE;
	RefreshTargetPosition();
	numRocketsLeft = 12 + UnityEngine.Random.Range(-1, 1);
	lastRocketTime = 0f;
	movementLockingAiming = true;
	UnityEngine.Vector3 randomOffset = GetRandomOffset(strafe_target_position, 175f, 192.5f);
	SetTargetDestination(randomOffset, 10f);
	SetIdealRotation(GetYawRotationTo(randomOffset));
	puttingDistance = true;
}

```
