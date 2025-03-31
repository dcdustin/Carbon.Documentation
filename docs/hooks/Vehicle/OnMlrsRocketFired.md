# OnMlrsRocketFired
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnMlrsRocketFired()
{
	Puts("OnMlrsRocketFired has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ MLRS]
public void FireNextRocket()
{
	RocketAmmoCount = GetRocketContainer().inventory.GetAmmoAmount(Rust.AmmoTypes.MLRS_ROCKET);
	if (nextRocketIndex < 0 || nextRocketIndex >= RocketAmmoCount || IsBroken())
	{
		EndFiring();
		return;
	}
	StorageContainer rocketContainer = GetRocketContainer();
	UnityEngine.Vector3 firingPos = firingPoint.position + firingPoint.rotation * rocketTubes[nextRocketIndex].firingOffset;
	float num = 1f;
	if (radiusModIndex < radiusMods.Length)
	{
		num = radiusMods[radiusModIndex];
	}
	radiusModIndex++;
	UnityEngine.Vector2 vector = UnityEngine.Random.insideUnitCircle * (targetAreaRadius - RocketDamageRadius) * num;
	UnityEngine.Vector3 target = TrueHitPos + new UnityEngine.Vector3(vector.x, 0f, vector.y);
	float requiredGravity;
	UnityEngine.Vector3 aimToTarget = Ballistics.GetAimToTarget(firingPoint.position, target, rocketSpeed, vRotMax, rocketBaseGravity, minRange, out requiredGravity);
	if (TryFireProjectile(rocketContainer, Rust.AmmoTypes.MLRS_ROCKET, firingPos, aimToTarget, rocketOwnerRef.Get(serverside: true) as BasePlayer, 0f, 0f, out var projectile))
	{
		projectile.gravityModifier = requiredGravity / (0f - UnityEngine.Physics.gravity.y);
		nextRocketIndex--;
	}
	else
	{
		EndFiring();
	}
}

```
:::
