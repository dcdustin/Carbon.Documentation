<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnBasePlayerAttacked
```csharp
public override void OnAttacked(HitInfo info)
{
	float oldHealth = base.health;
	if (InSafeZone() && !IsHostile() && info.Initiator != null && info.Initiator != this)
	{
		info.damageTypes.ScaleAll(0f);
	}
	if (base.isServer)
	{
		HitArea boneArea = info.boneArea;
		if (boneArea != (HitArea)(-1))
		{
			System.Collections.Generic.List<Item> obj = Facepunch.Pool.Get<System.Collections.Generic.List<Item>>();
			obj.AddRange(inventory.containerWear.itemList);
			for (int i = 0; i < obj.Count; i++)
			{
				Item item = obj[i];
				if (item != null)
				{
					ItemModWearable component = item.info.GetComponent<ItemModWearable>();
					if (!(component == null) && component.ProtectsArea(boneArea))
					{
						item.OnAttacked(info);
					}
				}
			}
			Facepunch.Pool.Free(ref obj, freeElements: false);
			inventory.ServerUpdate(0f);
		}
	}
	base.OnAttacked(info);
	if (base.isServer && base.isServer && info.hasDamage)
	{
		if (!info.damageTypes.Has(Rust.DamageType.Bleeding) && info.damageTypes.IsBleedCausing() && !IsWounded() && !IsImmortalTo(info))
		{
			float num = ((modifiers != null) ? UnityEngine.Mathf.Clamp01(1f - modifiers.GetValue(Modifier.ModifierType.Clotting)) : 1f);
			metabolism.bleeding.Add(info.damageTypes.Total() * 0.2f * num);
		}
		if (isMounted)
		{
			GetMounted().MounteeTookDamage(this, info);
		}
		CheckDeathCondition(info);
		if (net != null && net.connection != null)
		{
			ClientRPC(RpcTarget.Player("TakeDamageHit", this));
		}
		string text = StringPool.Get(info.HitBone);
		bool flag = UnityEngine.Vector3.Dot((info.PointEnd - info.PointStart).normalized, eyes.BodyForward()) > 0.4f;
		BasePlayer initiatorPlayer = info.InitiatorPlayer;
		if ((bool)initiatorPlayer && !info.damageTypes.IsMeleeType())
		{
			initiatorPlayer.LifeStoryShotHit(info.Weapon);
		}
		if (info.isHeadshot)
		{
			if (flag)
			{
				SignalBroadcast(BaseEntity.Signal.Flinch_RearHead, string.Empty);
			}
			else
			{
				SignalBroadcast(BaseEntity.Signal.Flinch_Head, string.Empty);
			}
			Effect.server.Run("assets/bundled/prefabs/fx/headshot.prefab", this, 0u, new UnityEngine.Vector3(0f, 2f, 0f), UnityEngine.Vector3.zero, (initiatorPlayer != null) ? initiatorPlayer.net.connection : null);
			if ((bool)initiatorPlayer)
			{
				initiatorPlayer.stats.Add("headshot", 1, (Stats)5);
				if (initiatorPlayer.IsBeingSpectated)
				{
					foreach (BaseEntity child in initiatorPlayer.children)
					{
						if (child is BasePlayer basePlayer)
						{
							basePlayer.ClientRPC(RpcTarget.Player("SpectatedPlayerHeadshot", basePlayer));
						}
					}
				}
			}
		}
		else if (flag)
		{
			SignalBroadcast(BaseEntity.Signal.Flinch_RearTorso, string.Empty);
		}
		else if (text == "spine" || text == "spine2")
		{
			SignalBroadcast(BaseEntity.Signal.Flinch_Stomach, string.Empty);
		}
		else
		{
			SignalBroadcast(BaseEntity.Signal.Flinch_Chest, string.Empty);
		}
	}
	if (stats != null)
	{
		if (IsWounded())
		{
			stats.combat.LogAttack(info, "wounded", oldHealth);
		}
		else if (IsDead())
		{
			stats.combat.LogAttack(info, "killed", oldHealth);
		}
		else
		{
			stats.combat.LogAttack(info, "", oldHealth);
		}
	}
	if (ConVar.Global.cinematicGingerbreadCorpses)
	{
		info.HitMaterial = ConVar.Global.GingerbreadMaterialID();
	}
}

```
