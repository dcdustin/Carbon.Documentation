# OnClientProjectileEffectCreate
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a projectile impact effect is being created for clients (like bullet impact visuals).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnClientProjectileEffectCreate(Network.Connection sourceConnection, BaseProjectile baseProjectile, string prefabName)
{
	Puts("OnClientProjectileEffectCreate has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseProjectile]
public void CreateProjectileEffectClientside(string prefabName, UnityEngine.Vector3 pos, UnityEngine.Vector3 velocity, int seed, Network.Connection sourceConnection, bool silenced = false, bool forceClientsideEffects = false, System.Collections.Generic.List<Network.Connection> targets = null, float distanceOverride = 0f)
{
	Effect effect = reusableInstance;
	effect.Init(Effect.Type.Projectile, pos, velocity, sourceConnection);
	effect.scale = (silenced ? 0f : 1f);
	if (forceClientsideEffects)
	{
		effect.scale = 2f;
	}
	effect.pooledString = prefabName;
	effect.number = seed;
	effect.targets = targets;
	effect.distanceOverride = distanceOverride;
	EffectNetwork.Send(effect);
}

```
:::
