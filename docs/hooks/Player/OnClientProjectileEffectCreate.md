<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnClientProjectileEffectCreate
```csharp
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
