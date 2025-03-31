<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFlameThrowerBurn
```csharp
public void FlameTick()
{
	float num = UnityEngine.Time.realtimeSinceStartup - lastFlameTick;
	lastFlameTick = UnityEngine.Time.realtimeSinceStartup;
	BasePlayer ownerPlayer = GetOwnerPlayer();
	if (!ownerPlayer)
	{
		return;
	}
	SingletonComponent<NpcFireManager>.Instance.Move(this);
	ReduceAmmo(num);
	SendNetworkUpdate();
	UnityEngine.Ray ray = ownerPlayer.eyes.BodyRay();
	UnityEngine.Vector3 origin = ray.origin;
	UnityEngine.RaycastHit hitInfo;
	bool num2 = UnityEngine.Physics.SphereCast(ray, 0.3f, out hitInfo, flameRange, 1218652417);
	if (!num2)
	{
		hitInfo.point = origin + ray.direction * flameRange;
	}
	float num3 = (ownerPlayer.IsNpc ? npcDamageScale : 1f);
	float amount = damagePerSec[0].amount;
	damagePerSec[0].amount = amount * num * num3;
	int num4 = 2146305;
	int layers = 133376;
	if (!ownerPlayer.IsNpc)
	{
		num4 |= 0x800;
	}
	DamageUtil.RadiusDamage(ownerPlayer, LookupPrefab(), hitInfo.point - ray.direction * 0.1f, flameRadius * 0.5f, flameRadius, damagePerSec, num4, useLineOfSight: true, ignoreAI: false, ignoreAttackingPlayer: true, extendedLineOfSight: true);
	damagePerSec[0].amount = damagePerSec[0].amount * playerDamageMultiplier;
	DamageUtil.RadiusDamage(ownerPlayer, LookupPrefab(), hitInfo.point - ray.direction * 0.1f, flameRadius * 0.5f, flameRadius, damagePerSec, layers, useLineOfSight: true, ignoreAI: false, ignoreAttackingPlayer: true, extendedLineOfSight: true);
	damagePerSec[0].amount = amount;
	if (num2 && UnityEngine.Time.realtimeSinceStartup >= nextFlameTime && hitInfo.distance > 1.1f)
	{
		nextFlameTime = UnityEngine.Time.realtimeSinceStartup + (ownerPlayer.IsNpc ? 0.25f : 0.45f);
		UnityEngine.Vector3 vector = hitInfo.point - ray.direction * 0.25f;
		UnityEngine.Vector3 vector2 = vector + new UnityEngine.Vector3(0f, 0.2f, 0f);
		bool flag = !GamePhysics.CheckSphere(vector, 0.1f, 1084293377);
		if (!flag && GamePhysics.LineOfSight(vector, vector2, 1084293377))
		{
			vector = vector2;
			flag = !GamePhysics.CheckSphere(vector, 0.1f, 1084293377);
		}
		if (flag)
		{
			BaseEntity baseEntity = GameManager.server.CreateEntity(fireballPrefab.resourcePath, vector);
			if ((bool)baseEntity)
			{
				baseEntity.creatorEntity = ownerPlayer;
				FireBall fireBall = baseEntity as FireBall;
				if (fireBall != null && ownerPlayer.IsNpc)
				{
					fireBall.ignoreNPC = true;
				}
				baseEntity.Spawn();
			}
		}
	}
	if (ammo == 0)
	{
		SetFlameState(wantsOn: false);
	}
	Item ownerItem = GetOwnerItem();
	if (ownerItem != null && !base.UsingInfiniteAmmoCheat && !ownerPlayer.IsNpc)
	{
		ownerItem.LoseCondition(num);
	}
}

```
