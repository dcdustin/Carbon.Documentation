<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OwnerID ConstructableEntity [patch]
```csharp
public override void OnRepairFinished()
{
	base.OnRepairFinished();
	Kill();
	GameManager.server.CreateEntity(entityToSpawn.resourcePath, base.transform.position, base.transform.rotation).Spawn();
	if (spawnEffect.isValid)
	{
		Effect.server.Run(spawnEffect.resourcePath, base.transform.position, UnityEngine.Vector3.up);
	}
}

```
