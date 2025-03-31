# OnPlayerPveDamage
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerPveDamage(BaseEntity initiator, HitInfo info, BuildingBlock buildingBlock)
{
	Puts("OnPlayerPveDamage has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BuildingBlock]
public override void Hurt(HitInfo info)
{
	if (ConVar.Server.pve && (bool)info.Initiator && info.Initiator is BasePlayer)
	{
		(info.Initiator as BasePlayer).Hurt(info.damageTypes.Total(), Rust.DamageType.Generic);
	}
	else
	{
		if ((bool)info.Initiator && info.Initiator is BasePlayer { IsInTutorial: not false })
		{
			return;
		}
		if (HasWallpaper())
		{
			Rust.DamageType majorityDamageType = info.damageTypes.GetMajorityDamageType();
			bool flag = info.damageTypes.Contains(Rust.DamageType.Explosion);
			Rust.DamageTypeList damageTypeList = info.damageTypes.Clone();
			if (wallpaperProtection != null)
			{
				wallpaperProtection.Scale(damageTypeList);
			}
			float totalDamage = damageTypeList.Total();
			if (majorityDamageType == Rust.DamageType.Decay || flag || majorityDamageType == Rust.DamageType.Heat)
			{
				DamageWallpaper(totalDamage);
				DamageWallpaper(totalDamage, 1);
			}
			else
			{
				bool flag2 = false;
				for (int i = 0; i < propDirection.Length; i++)
				{
					if (propDirection[i].IsWeakspot(base.transform, info))
					{
						flag2 = true;
						break;
					}
				}
				DamageWallpaper(totalDamage, (!flag2) ? 1 : 0);
			}
		}
		base.Hurt(info);
	}
}

```
:::
