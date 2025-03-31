<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanSamSiteShoot
```csharp
public void WeaponTick()
{
	if (IsDead() || UnityEngine.Time.time < lockOnTime || UnityEngine.Time.time < nextBurstTime)
	{
		return;
	}
	if (!IsPowered())
	{
		firedCount = 0;
		return;
	}
	if (firedCount >= 6)
	{
		float timeBetweenBursts = mostRecentTargetType.timeBetweenBursts;
		nextBurstTime = UnityEngine.Time.time + timeBetweenBursts;
		firedCount = 0;
		return;
	}
	EnsureReloaded();
	if (HasAmmo())
	{
		bool num = ammoItem != null && ammoItem.amount == lowAmmoThreshold;
		if (!staticRespawn && ammoItem != null)
		{
			ammoItem.UseItem();
		}
		firedCount++;
		float speedMultiplier = 1f;
		if (!currentTarget.IsUnityNull())
		{
			speedMultiplier = currentTarget.SAMTargetType.speedMultiplier;
		}
		FireProjectile(tubes[currentTubeIndex].position, currentAimDir, speedMultiplier);
		Effect.server.Run(muzzleFlashTest.resourcePath, this, StringPool.Get("Tube " + (currentTubeIndex + 1)), UnityEngine.Vector3.zero, UnityEngine.Vector3.up);
		currentTubeIndex++;
		if (currentTubeIndex >= tubes.Length)
		{
			currentTubeIndex = 0;
		}
		if (num)
		{
			MarkIODirty();
		}
	}
}

```
