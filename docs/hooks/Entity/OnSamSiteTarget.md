# OnSamSiteTarget
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a SAM site locks on to a new target (acquires a target to shoot).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSamSiteTarget()
{
	Puts("OnSamSiteTarget has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ SamSite]
public void TargetScan()
{
	if (!IsPowered())
	{
		lastTargetVisibleTime = 0f;
		return;
	}
	if (UnityEngine.Time.time > lastTargetVisibleTime + 3f)
	{
		ClearTarget();
	}
	if (!staticRespawn)
	{
		int num = ((ammoItem != null && ammoItem.parent == base.inventory) ? ammoItem.amount : 0);
		bool flag = lastAmmoCount < lowAmmoThreshold;
		bool flag2 = num < lowAmmoThreshold;
		if (num != lastAmmoCount && flag != flag2)
		{
			MarkIODirty();
		}
		lastAmmoCount = num;
	}
	if (HasValidTarget() || IsDead())
	{
		return;
	}
	System.Collections.Generic.List<SamSite.ISamSiteTarget> obj = Facepunch.Pool.Get<System.Collections.Generic.List<SamSite.ISamSiteTarget>>();
	if (!IsInDefenderMode())
	{
		AddTargetSet(obj, targetTypeVehicle.scanRadius);
	}
	AddMLRSRockets(obj, targetTypeMissile.scanRadius);
	SamSite.ISamSiteTarget samSiteTarget = null;
	foreach (SamSite.ISamSiteTarget item in obj)
	{
		if (!item.isClient && !(item.CenterPoint().y < eyePoint.transform.position.y) && item.IsVisible(eyePoint.transform.position, item.SAMTargetType.scanRadius * 2f) && item.IsValidSAMTarget(staticRespawn))
		{
			samSiteTarget = item;
			break;
		}
	}
	if (!samSiteTarget.IsUnityNull() && currentTarget != samSiteTarget)
	{
		lockOnTime = UnityEngine.Time.time + 0.5f;
	}
	SetTarget(samSiteTarget);
	if (!currentTarget.IsUnityNull())
	{
		lastTargetVisibleTime = UnityEngine.Time.time;
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
	if (currentTarget.IsUnityNull())
	{
		CancelInvoke(WeaponTick);
	}
	else
	{
		InvokeRandomized(WeaponTick, 0f, 0.5f, 0.2f);
	}
}

```
:::
