# OnCatapultFireForce
<Badge type="info" text="Primitive"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a catapult is fired, providing the force applied to the launch.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnCatapultFireForce(Catapult catapult, BasePlayer shooter, float local1)
{
	Puts("OnCatapultFireForce has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Catapult]
public bool Fire(BasePlayer shooter, float force)
{
	FireRecoil();
	float num = UnityEngine.Mathf.Lerp(2f, 1f, UnityEngine.Mathf.Clamp01(force));
	float num2 = UnityEngine.Mathf.Lerp(0.5f, 1f, UnityEngine.Mathf.Clamp01(force));
	bool flag = true;
	UnityEngine.Vector3 firingPos = muzzle.position;
	BasePlayer passenger = GetPassenger();
	if (passenger != null)
	{
		passenger.ServerPosition = muzzle.transform.position;
		passenger.Ragdoll(muzzle.transform.forward * (20f * num2) + UnityEngine.Vector3.up * (2.5f * num), matchPlayerGravity: false, flailInAir: true, dieOnImpact: true, this);
		return true;
	}
	if (GamePhysics.CheckSphere(muzzle.position, 1f, 1236994833, UnityEngine.QueryTriggerInteraction.Ignore))
	{
		UnityEngine.Vector3 vector = base.transform.position + UnityEngine.Vector3.up * 2f;
		if (GamePhysics.Trace(new UnityEngine.Ray(vector, muzzle.position - vector), 0f, out var hitInfo, 10f, 1236994833, UnityEngine.QueryTriggerInteraction.Ignore))
		{
			flag = false;
			firingPos = hitInfo.point - UnityEngine.Vector3.up;
		}
	}
	ServerProjectile projectile2;
	if (loadedAmmoDef == BoulderItemDef)
	{
		ItemModCatapultBoulder component = loadedAmmoDef.GetComponent<ItemModCatapultBoulder>();
		if (component == null)
		{
			return false;
		}
		foreach (ItemModCatapultBoulder.ProjectileSettings projectileSetting in component.projectileSettings)
		{
			for (int i = 0; i < projectileSetting.count; i++)
			{
				UnityEngine.Vector3 forward = muzzle.forward;
				forward = UnityEngine.Quaternion.Euler(UnityEngine.Random.Range(0f - component.spreadAngle, component.spreadAngle), UnityEngine.Random.Range(0f - component.spreadAngle, component.spreadAngle), 0f) * forward;
				if (FireProjectile(projectileSetting.prefab, firingPos, forward, shooter, 0.25f, 30f * num2, out var projectile))
				{
					if (!flag)
					{
						projectile.GetComponent<TimedExplosive>()?.ForceExplode();
					}
					projectile.ignoreEntity = this;
					projectile.gravityModifier *= num * UnityEngine.Random.Range(1f - projectileSetting.gravityModifier, 1f + projectileSetting.gravityModifier);
					shooter.MarkHostileFor();
				}
			}
		}
		loadedAmmoItem.UseItem();
	}
	else if (TryFireProjectile(ammoStorageRef.Get(base.isServer), Rust.AmmoTypes.CATAPULT_BOULDER, firingPos, muzzle.forward, shooter, 0.25f, 30f * num2, out projectile2))
	{
		projectile2.ignoreEntity = this;
		if (!flag)
		{
			projectile2.GetComponent<TimedExplosive>()?.ForceExplode();
		}
		projectile2.gravityModifier *= num;
		shooter.MarkHostileFor();
		return true;
	}
	return false;
}

```
:::
