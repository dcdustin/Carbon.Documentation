<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnBasePlayerHurt
Called when a player is hurt and takes damage (internal event).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object IOnBasePlayerHurt()
{
	Puts("IOnBasePlayerHurt has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public override void Hurt(HitInfo info)
{
	if (IsDead() || IsTransferProtected() || (IsImmortalTo(info) && info.damageTypes.Total() >= 0f))
	{
		return;
	}
	bool wasWounded = IsWounded();
	if (ConVar.Server.pve && !IsNpc && (bool)info.Initiator && info.Initiator is BasePlayer && info.Initiator != this)
	{
		(info.Initiator as BasePlayer).Hurt(info.damageTypes.Total(), Rust.DamageType.Generic);
		return;
	}
	if (info.damageTypes.Has(Rust.DamageType.Fun_Water))
	{
		bool flag = true;
		Item activeItem = GetActiveItem();
		if (activeItem != null && (activeItem.info.shortname == "gun.water" || activeItem.info.shortname == "pistol.water"))
		{
			float value = metabolism.wetness.value;
			metabolism.wetness.Add(ConVar.Server.funWaterWetnessGain);
			bool flag2 = metabolism.wetness.value >= ConVar.Server.funWaterDamageThreshold;
			flag = !flag2;
			if (info.InitiatorPlayer != null)
			{
				if (flag2 && value < ConVar.Server.funWaterDamageThreshold)
				{
					info.InitiatorPlayer.GiveAchievement("SUMMER_SOAKED");
				}
				if (metabolism.radiation_level.Fraction() > 0.2f && !string.IsNullOrEmpty("SUMMER_RADICAL"))
				{
					info.InitiatorPlayer.GiveAchievement("SUMMER_RADICAL");
				}
			}
		}
		if (flag)
		{
			info.damageTypes.Scale(Rust.DamageType.Fun_Water, 0f);
		}
	}
	if (info.damageTypes.Get(Rust.DamageType.Drowned) > 5f && drownEffect.isValid)
	{
		Effect.server.Run(drownEffect.resourcePath, this, StringPool.Get("head"), UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
	}
	if (modifiers != null)
	{
		if (info.damageTypes.Has(Rust.DamageType.Radiation))
		{
			info.damageTypes.Scale(Rust.DamageType.Radiation, 1f - UnityEngine.Mathf.Clamp01(modifiers.GetValue(Modifier.ModifierType.Radiation_Resistance)));
		}
		if (info.damageTypes.Has(Rust.DamageType.RadiationExposure))
		{
			info.damageTypes.Scale(Rust.DamageType.RadiationExposure, 1f - UnityEngine.Mathf.Clamp01(modifiers.GetValue(Modifier.ModifierType.Radiation_Exposure_Resistance)));
		}
	}
	metabolism.pending_health.Subtract(info.damageTypes.Total() * 10f);
	BasePlayer initiatorPlayer = info.InitiatorPlayer;
	if ((bool)initiatorPlayer && initiatorPlayer != this)
	{
		if (initiatorPlayer.InSafeZone() || InSafeZone())
		{
			initiatorPlayer.MarkHostileFor(300f);
		}
		if (initiatorPlayer.InSafeZone() && !initiatorPlayer.IsNpc)
		{
			info.damageTypes.ScaleAll(0f);
			return;
		}
		if (initiatorPlayer.IsNpc && initiatorPlayer.Family == BaseNpc.AiStatistics.FamilyEnum.Murderer && info.damageTypes.Get(Rust.DamageType.Explosion) > 0f)
		{
			info.damageTypes.ScaleAll(ConVar.Halloween.scarecrow_beancan_vs_player_dmg_modifier);
		}
	}
	base.Hurt(info);
	if ((bool)BaseGameMode.GetActiveGameMode(serverside: true))
	{
		BasePlayer instigator = info?.InitiatorPlayer;
		BaseGameMode.GetActiveGameMode(serverside: true).OnPlayerHurt(instigator, this, info);
	}
	if (IsRestrained && Rust.DamageTypeEx.InterruptsRestraintMinigame(info.damageTypes.GetMajorityDamageType()))
	{
		Handcuffs handcuffs = GetHeldEntity() as Handcuffs;
		if (handcuffs != null)
		{
			handcuffs.InterruptUnlockMiniGame(wasPushedOrDamaged: true);
		}
	}
	EACServer.LogPlayerTakeDamage(this, info, wasWounded);
	metabolism.SendChangesToClient();
	if (info.PointStart != UnityEngine.Vector3.zero && (info.damageTypes.Total() >= 0f || IsGod()))
	{
		int arg = (int)info.damageTypes.GetMajorityDamageType();
		if (info.Weapon != null && info.damageTypes.Has(Rust.DamageType.Bullet))
		{
			BaseProjectile component = info.Weapon.GetComponent<BaseProjectile>();
			if (component != null && component.IsSilenced())
			{
				arg = 12;
			}
		}
		ClientRPC(RpcTarget.PlayerAndSpectators("DirectionalDamage", this), info.PointStart, arg, UnityEngine.Mathf.CeilToInt(info.damageTypes.Total()));
	}
	BasePlayer.DeathBlow.From(info, out cachedNonSuicideHit);
}

```
:::
