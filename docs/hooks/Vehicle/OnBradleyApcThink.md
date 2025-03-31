# OnBradleyApcThink
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBradleyApcThink(BradleyAPC bradleyAPC)
{
	Puts("OnBradleyApcThink has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BradleyAPC]
public void DoSimpleAI()
{
	if (base.isClient)
	{
		return;
	}
	SetFlag(BaseEntity.Flags.Reserved5, TOD_Sky.Instance.IsNight);
	if (!DoAI)
	{
		return;
	}
	SetTarget();
	if (mountingScientists || inDeployedState)
	{
		ClearPath();
	}
	else if (!IsOnSpline())
	{
		if (targetList.Count > 0)
		{
			UpdateMovement_Hunt();
		}
		else
		{
			UpdateMovement_Patrol();
		}
	}
	if (!IsOnSpline())
	{
		AdvancePathMovement(force: false);
		float num = UnityEngine.Vector3.Distance(base.transform.position, destination);
		float value = UnityEngine.Vector3.Distance(base.transform.position, finalDestination);
		if (num > stoppingDist)
		{
			UnityEngine.Vector3 lhs = Direction2D(destination, base.transform.position);
			float num2 = UnityEngine.Vector3.Dot(lhs, base.transform.right);
			float num3 = UnityEngine.Vector3.Dot(lhs, base.transform.right);
			float num4 = UnityEngine.Vector3.Dot(lhs, -base.transform.right);
			if (UnityEngine.Vector3.Dot(lhs, -base.transform.forward) > num2)
			{
				if (num3 >= num4)
				{
					turning = 1f;
				}
				else
				{
					turning = -1f;
				}
			}
			else
			{
				turning = UnityEngine.Mathf.Clamp(num2 * 3f, -1f, 1f);
			}
			float throttleScaleFromTurn = 1f - UnityEngine.Mathf.InverseLerp(0f, 0.3f, UnityEngine.Mathf.Abs(turning));
			AvoidObstacles(ref throttleScaleFromTurn);
			float num5 = UnityEngine.Vector3.Dot(myRigidBody.velocity, base.transform.forward);
			if (!(throttle > 0f) || !(num5 < 0.5f))
			{
				timeSinceSeemingStuck = 0f;
			}
			else if ((float)timeSinceSeemingStuck > 10f)
			{
				timeSinceStuckReverseStart = 0f;
				timeSinceSeemingStuck = 0f;
			}
			float num6 = UnityEngine.Mathf.InverseLerp(0.1f, 0.4f, UnityEngine.Vector3.Dot(base.transform.forward, UnityEngine.Vector3.up));
			if ((float)timeSinceStuckReverseStart < 3f)
			{
				throttle = -0.75f;
				turning = 1f;
			}
			else
			{
				throttle = (0.1f + UnityEngine.Mathf.InverseLerp(0f, 20f, value) * 1f) * throttleScaleFromTurn + num6;
			}
		}
	}
	DoWeaponAiming();
	SendNetworkUpdate();
}

```
:::
