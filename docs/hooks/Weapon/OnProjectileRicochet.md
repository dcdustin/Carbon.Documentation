# OnProjectileRicochet
<Badge type="info" text="Weapon"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnProjectileRicochet(BasePlayer basePlayer, ProtoBuf.PlayerProjectileRicochet local0)
{
	Puts("OnProjectileRicochet has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
public void OnProjectileRicochet(BaseEntity.RPCMessage msg)
{
	ProtoBuf.PlayerProjectileRicochet playerProjectileRicochet = ProtoBuf.PlayerProjectileRicochet.Deserialize(msg.read);
	if (playerProjectileRicochet != null)
	{
		BasePlayer.FiredProjectile value;
		if (UnityEngine.Vector3Ex.IsNaNOrInfinity(playerProjectileRicochet.hitPosition) || UnityEngine.Vector3Ex.IsNaNOrInfinity(playerProjectileRicochet.inVelocity) || UnityEngine.Vector3Ex.IsNaNOrInfinity(playerProjectileRicochet.outVelocity) || UnityEngine.Vector3Ex.IsNaNOrInfinity(playerProjectileRicochet.hitNormal) || float.IsNaN(playerProjectileRicochet.travelTime) || float.IsInfinity(playerProjectileRicochet.travelTime))
		{
			AntiHack.Log(this, AntiHackType.ProjectileHack, "Contains NaN (" + playerProjectileRicochet.projectileID + ")");
			playerProjectileRicochet.ResetToPool();
			playerProjectileRicochet = null;
		}
		else if (!firedProjectiles.TryGetValue(playerProjectileRicochet.projectileID, out value))
		{
			AntiHack.Log(this, AntiHackType.ProjectileHack, "Missing ID (" + playerProjectileRicochet.projectileID + ")", logToAnalytics: false);
			playerProjectileRicochet.ResetToPool();
			playerProjectileRicochet = null;
		}
		else if (value.firedTime < UnityEngine.Time.realtimeSinceStartup - 8f)
		{
			AntiHack.Log(this, AntiHackType.ProjectileHack, "Lifetime is zero (" + playerProjectileRicochet.projectileID + ")");
			playerProjectileRicochet.ResetToPool();
			playerProjectileRicochet = null;
		}
		else
		{
			value.ricochets++;
			firedProjectiles[playerProjectileRicochet.projectileID] = value;
			playerProjectileRicochet.ResetToPool();
			playerProjectileRicochet = null;
		}
	}
}

```
:::
