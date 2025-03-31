# OnFireBallDamage
<Badge type="info" text="Weapon"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnFireBallDamage()
{
	Puts("OnFireBallDamage has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ FireBall]
public void DoRadialDamage()
{
	System.Collections.Generic.List<BaseCombatEntity> obj = Facepunch.Pool.Get<System.Collections.Generic.List<BaseCombatEntity>>();
	UnityEngine.Vector3 position = base.transform.position + new UnityEngine.Vector3(0f, radius * 0.75f, 0f);
	Vis.Entities(position, radius, obj, AttackLayers, UnityEngine.QueryTriggerInteraction.Ignore);
	HitInfo hitInfo = new HitInfo();
	hitInfo.DoHitEffects = true;
	hitInfo.DidHit = true;
	hitInfo.HitBone = 0u;
	hitInfo.Initiator = ((creatorEntity == null) ? UnityEngine.GameObjectEx.ToBaseEntity(base.gameObject) : creatorEntity);
	hitInfo.PointStart = base.transform.position;
	foreach (BaseCombatEntity item in obj)
	{
		if (!(item == null) && item.isServer && item.IsAlive() && (!ignoreNPC || !item.IsNpc) && item.IsVisible(position))
		{
			if (item is BasePlayer)
			{
				Effect.server.Run("assets/bundled/prefabs/fx/impacts/additive/fire.prefab", item, 0u, new UnityEngine.Vector3(0f, 1f, 0f), UnityEngine.Vector3.up);
			}
			hitInfo.PointEnd = item.transform.position;
			hitInfo.HitPositionWorld = item.transform.position;
			hitInfo.damageTypes.Set(Rust.DamageType.Heat, damagePerSecond * tickRate);
			item.OnAttacked(hitInfo);
		}
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
}

```
:::
