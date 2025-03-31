# CanBeWounded
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called to check if a player can enter the wounded state (versus dying immediately).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanBeWounded(BasePlayer basePlayer)
{
	Puts("CanBeWounded has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public virtual bool EligibleForWounding(HitInfo info)
{
	if (!ConVar.Server.woundingenabled)
	{
		return false;
	}
	if (IsWounded())
	{
		return false;
	}
	if (IsSleeping())
	{
		return false;
	}
	if (isMounted)
	{
		return false;
	}
	if (info == null)
	{
		return false;
	}
	if (!IsWounded() && UnityEngine.Time.realtimeSinceStartup - lastWoundedStartTime < ConVar.Server.rewounddelay)
	{
		return false;
	}
	BaseGameMode activeGameMode = BaseGameMode.GetActiveGameMode(serverside: true);
	if ((bool)activeGameMode && !activeGameMode.allowWounding)
	{
		return false;
	}
	if (triggers != null)
	{
		for (int i = 0; i < triggers.Count; i++)
		{
			if (triggers[i] is IHurtTrigger)
			{
				return false;
			}
		}
	}
	if (info.WeaponPrefab is BaseMelee)
	{
		return true;
	}
	if (info.WeaponPrefab is BaseProjectile)
	{
		return !info.isHeadshot;
	}
	return info.damageTypes.GetMajorityDamageType() switch
	{
		Rust.DamageType.Suicide => false, 
		Rust.DamageType.Fall => true, 
		Rust.DamageType.Bite => true, 
		Rust.DamageType.Bleeding => true, 
		Rust.DamageType.Hunger => true, 
		Rust.DamageType.Thirst => true, 
		Rust.DamageType.Poison => true, 
		_ => false, 
	};
}

```
:::
