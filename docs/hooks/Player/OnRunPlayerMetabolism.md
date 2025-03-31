# OnRunPlayerMetabolism
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when running a player's metabolism update (applies hunger/thirst status changes).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRunPlayerMetabolism(PlayerMetabolism playerMetabolism)
{
	Puts("OnRunPlayerMetabolism has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerMetabolism]
public override void RunMetabolism(BaseCombatEntity ownerEntity, float delta)
{
	BaseGameMode activeGameMode = BaseGameMode.GetActiveGameMode(serverside: true);
	float num = owner.currentTemperature;
	float fTarget = owner.currentComfort;
	UpdateWorkbenchFlags();
	owner.SetPlayerFlag(BasePlayer.PlayerFlags.SafeZone, owner.InSafeZone());
	owner.SetPlayerFlag(BasePlayer.PlayerFlags.NoRespawnZone, owner.InNoRespawnZone());
	owner.SetPlayerFlag(BasePlayer.PlayerFlags.ModifyClan, ConVar.Clan.editsRequireClanTable && owner.CanModifyClan());
	bool num2 = activeGameMode == null || activeGameMode.allowTemperature;
	if (owner.IsInTutorial)
	{
		num = 25f;
	}
	if (num2)
	{
		float num3 = num + GetCoreTempAdjustment() - DeltaWet() * 34f;
		float num4 = UnityEngine.Mathf.Clamp(owner.baseProtection.amounts[18] * 1.5f, -1f, 1f);
		float num5 = UnityEngine.Mathf.InverseLerp(20f, -50f, num);
		float num6 = UnityEngine.Mathf.InverseLerp(20f, 30f, num);
		float fTarget2 = UnityEngine.Mathf.Clamp(num3 + num5 * 70f * num4 + num6 * 10f * UnityEngine.Mathf.Abs(num4) + heartrate.value * 5f, GetCoreTempMin(), GetCoreTempMax());
		temperature.MoveTowards(fTarget2, delta * 5f);
	}
	else
	{
		temperature.value = 25f;
	}
	if (temperature.value >= 40f)
	{
		fTarget = 0f;
	}
	comfort.MoveTowards(fTarget, delta / 5f);
	float num7 = 0.6f + 0.4f * comfort.value;
	if (calories.value > 100f && owner.healthFraction < num7 && radiation_poison.Fraction() < 0.25f && owner.SecondsSinceAttacked > 10f && !SignificantBleeding() && temperature.value >= 10f && hydration.value > 40f)
	{
		float num8 = UnityEngine.Mathf.InverseLerp(calories.min, calories.max, calories.value);
		float num9 = 5f;
		float num10 = num9 * owner.MaxHealth() * 0.8f / 600f;
		num10 += num10 * num8 * 0.5f;
		float num11 = num10 / num9;
		num11 += num11 * comfort.value * 6f;
		ownerEntity.Heal(num11 * delta);
		calories.Subtract(num10 * delta);
		hydration.Subtract(num10 * delta * 0.2f);
	}
	float num12 = owner.estimatedSpeed2D / owner.GetMaxSpeed() * 0.75f;
	float fTarget3 = UnityEngine.Mathf.Clamp(0.05f + num12, 0f, 1f);
	heartrate.MoveTowards(fTarget3, delta * 0.1f);
	if (!owner.IsGod())
	{
		float num13 = heartrate.Fraction() * 0.375f;
		calories.MoveTowards(0f, delta * num13);
		float num14 = 1f / 120f;
		num14 += UnityEngine.Mathf.InverseLerp(40f, 60f, temperature.value) * (1f / 12f);
		num14 += heartrate.value * (1f / 15f);
		hydration.MoveTowards(0f, delta * num14);
	}
	bool b = hydration.Fraction() <= 0f || radiation_poison.value >= 100f;
	owner.SetPlayerFlag(BasePlayer.PlayerFlags.NoSprint, b);
	if (temperature.value > 40f)
	{
		hydration.Add(UnityEngine.Mathf.InverseLerp(40f, 200f, temperature.value) * delta * -1f);
	}
	if (temperature.value < 10f)
	{
		float num15 = UnityEngine.Mathf.InverseLerp(20f, -100f, temperature.value);
		heartrate.MoveTowards(UnityEngine.Mathf.Lerp(0.2f, 1f, num15), delta * 2f * num15);
	}
	float num16 = owner.AirFactor();
	float num17 = ((num16 > oxygen.value) ? 1f : 0.1f);
	oxygen.MoveTowards(num16, delta * num17);
	float f = 0f;
	float f2 = 0f;
	if (owner.IsOutside(owner.eyes.position))
	{
		f = Climate.GetRain(owner.eyes.position) * ConVar.Weather.wetness_rain;
		f2 = Climate.GetSnow(owner.eyes.position) * ConVar.Weather.wetness_snow;
	}
	bool flag = owner.baseProtection.amounts[4] > 0f;
	float currentEnvironmentalWetness = owner.currentEnvironmentalWetness;
	currentEnvironmentalWetness = UnityEngine.Mathf.Clamp(currentEnvironmentalWetness, 0f, 0.8f);
	float num18 = owner.WaterFactor();
	if (!flag && num18 > 0f)
	{
		wetness.value = UnityEngine.Mathf.Max(wetness.value, UnityEngine.Mathf.Clamp(num18, wetness.min, wetness.max));
	}
	float num19 = Mathx.Max(wetness.value, f, f2, currentEnvironmentalWetness);
	num19 = UnityEngine.Mathf.Min(num19, flag ? 0f : num19);
	wetness.MoveTowards(num19, delta * 0.05f);
	if (num18 < wetness.value && currentEnvironmentalWetness <= 0f)
	{
		wetness.MoveTowards(0f, delta * 0.2f * UnityEngine.Mathf.InverseLerp(0f, 100f, num));
	}
	poison.MoveTowards(0f, delta * (5f / 9f));
	if (wetness.Fraction() > 0.4f && owner.estimatedSpeed > 0.25f && radiation_level.Fraction() == 0f)
	{
		radiation_poison.Subtract(radiation_poison.value * 0.2f * wetness.Fraction() * delta * 0.2f);
	}
	if (ConVar.Server.radiation)
	{
		if (!owner.IsGod())
		{
			radiation_level.value = owner.radiationLevel;
			if (radiation_level.value > 0f)
			{
				radiation_poison.Add(radiation_level.value * delta);
			}
		}
		else if (radiation_level.value > 0f)
		{
			radiation_level.value = 0f;
			radiation_poison.value = 0f;
		}
	}
	if (pending_health.value > 0f)
	{
		float num20 = 1f + owner.modifiers.GetValue(Modifier.ModifierType.MetabolismBooster);
		float num21 = UnityEngine.Mathf.Min(1f * delta * num20, pending_health.value);
		ownerEntity.Heal(num21);
		if (ownerEntity.healthFraction == 1f)
		{
			pending_health.value = 0f;
		}
		else
		{
			pending_health.Subtract(num21);
		}
	}
}

```
:::
