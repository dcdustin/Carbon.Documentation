# OnDecayHeal
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a structure heals from decay (e.g., upkeep prevents decay damage and restores health).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnDecayHeal(DecayEntity decayEntity)
{
	Puts("OnDecayHeal has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ DecayEntity]
public virtual void OnDecay(Decay decay, float decayDeltaTime)
{
	lastDecayTick = UnityEngine.Time.time;
	if (HasParent() || !decay.ShouldDecay(this))
	{
		return;
	}
	float num = decayDeltaTime * ConVar.Decay.scale;
	if (ConVar.Decay.upkeep)
	{
		upkeepTimer += num;
		if (upkeepTimer > 0f)
		{
			BuildingPrivlidge buildingPrivilege = GetBuildingPrivilege();
			if (buildingPrivilege != null)
			{
				upkeepTimer -= buildingPrivilege.PurchaseUpkeepTime(this, UnityEngine.Mathf.Max(upkeepTimer, 600f));
			}
		}
		if (upkeepTimer < 1f)
		{
			if (base.healthFraction < 1f && GetEntityHealScale() > 0f && base.SecondsSinceAttacked > 600f)
			{
				float num2 = decayDeltaTime / GetEntityDecayDuration() * GetEntityHealScale();
				Heal(MaxHealth() * num2);
			}
			return;
		}
		upkeepTimer = 1f;
	}
	decayTimer += num;
	if (decayTimer < GetEntityDecayDelay())
	{
		return;
	}
	using (TimeWarning.New("DecayTick"))
	{
		float num3 = 1f;
		if (ConVar.Decay.upkeep)
		{
			if (!BypassInsideDecayMultiplier && !IsOutside())
			{
				num3 *= ConVar.Decay.upkeep_inside_decay_scale;
			}
		}
		else
		{
			for (int i = 0; i < decayPoints.Length; i++)
			{
				DecayPoint decayPoint = decayPoints[i];
				if (decayPoint.IsOccupied(this))
				{
					num3 -= decayPoint.protection;
				}
			}
		}
		if (num3 > 0f)
		{
			float num4 = num / GetEntityDecayDuration() * MaxHealth();
			Hurt(num4 * num3 * decayVariance, Rust.DamageType.Decay);
		}
	}
}

```
:::
