<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityDestroy
Called when a major AI-controlled entity is destroyed (e.g., CH47 helicopter or Bradley APC is killed).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEntityDestroy()
{
	Puts("OnEntityDestroy has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BradleyAPC]
public override void OnDied(HitInfo info)
{
	if (base.isClient)
	{
		return;
	}
	CreateExplosionMarker(10f);
	Effect.server.Run(explosionEffect.resourcePath, mainTurretEyePos.transform.position, UnityEngine.Vector3.up, null, broadcast: true);
	UnityEngine.Vector3 zero = UnityEngine.Vector3.zero;
	UnityEngine.GameObject gibSource = servergibs.Get().GetComponent<ServerGib>()._gibSource;
	System.Collections.Generic.List<ServerGib> list = ServerGib.CreateGibs(servergibs.resourcePath, base.gameObject, gibSource, zero, 3f);
	for (int i = 0; i < 12 - maxCratesToSpawn; i++)
	{
		BaseEntity baseEntity = GameManager.server.CreateEntity(this.fireBall.resourcePath, base.transform.position, base.transform.rotation);
		if (!baseEntity)
		{
			continue;
		}
		float minInclusive = 3f;
		float maxInclusive = 10f;
		UnityEngine.Vector3 onUnitSphere = UnityEngine.Random.onUnitSphere;
		baseEntity.transform.position = base.transform.position + new UnityEngine.Vector3(0f, 1.5f, 0f) + onUnitSphere * UnityEngine.Random.Range(-4f, 4f);
		UnityEngine.Collider component = baseEntity.GetComponent<UnityEngine.Collider>();
		baseEntity.Spawn();
		baseEntity.SetVelocity(zero + onUnitSphere * UnityEngine.Random.Range(minInclusive, maxInclusive));
		foreach (ServerGib item in list)
		{
			UnityEngine.Physics.IgnoreCollision(component, item.GetCollider(), ignore: true);
		}
	}
	for (int j = 0; j < maxCratesToSpawn; j++)
	{
		UnityEngine.Vector3 onUnitSphere2 = UnityEngine.Random.onUnitSphere;
		onUnitSphere2.y = 0f;
		onUnitSphere2.Normalize();
		UnityEngine.Vector3 pos = base.transform.position + new UnityEngine.Vector3(0f, 1.5f, 0f) + onUnitSphere2 * UnityEngine.Random.Range(2f, 3f);
		BaseEntity baseEntity2 = GameManager.server.CreateEntity(crateToDrop.resourcePath, pos, UnityEngine.Quaternion.LookRotation(onUnitSphere2));
		baseEntity2.Spawn();
		LootContainer lootContainer = baseEntity2 as LootContainer;
		if ((bool)lootContainer)
		{
			lootContainer.Invoke(lootContainer.RemoveMe, 1800f);
		}
		UnityEngine.Collider component2 = baseEntity2.GetComponent<UnityEngine.Collider>();
		UnityEngine.Rigidbody rigidbody = baseEntity2.gameObject.AddComponent<UnityEngine.Rigidbody>();
		rigidbody.useGravity = true;
		rigidbody.collisionDetectionMode = UnityEngine.CollisionDetectionMode.ContinuousDynamic;
		rigidbody.mass = 2f;
		rigidbody.interpolation = UnityEngine.RigidbodyInterpolation.Interpolate;
		rigidbody.velocity = zero + onUnitSphere2 * UnityEngine.Random.Range(1f, 3f);
		rigidbody.angularVelocity = UnityEngine.Vector3Ex.Range(-1.75f, 1.75f);
		rigidbody.drag = 0.5f * (rigidbody.mass / 5f);
		rigidbody.angularDrag = 0.2f * (rigidbody.mass / 5f);
		FireBall fireBall = GameManager.server.CreateEntity(this.fireBall.resourcePath) as FireBall;
		if ((bool)fireBall)
		{
			fireBall.SetParent(baseEntity2);
			fireBall.Spawn();
			fireBall.GetComponent<UnityEngine.Rigidbody>().isKinematic = true;
			fireBall.GetComponent<UnityEngine.Collider>().enabled = false;
		}
		baseEntity2.SendMessage("SetLockingEnt", fireBall.gameObject, UnityEngine.SendMessageOptions.DontRequireReceiver);
		foreach (ServerGib item2 in list)
		{
			UnityEngine.Physics.IgnoreCollision(component2, item2.GetCollider(), ignore: true);
		}
	}
	KillSpawnedScientists();
	if (info != null && info.InitiatorPlayer != null && info.InitiatorPlayer.serverClan != null)
	{
		info.InitiatorPlayer.AddClanScore(ClanScoreEventType.DestroyedBradley);
	}
	base.OnDied(info);
}

```
:::
