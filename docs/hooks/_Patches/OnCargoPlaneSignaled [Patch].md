<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCargoPlaneSignaled [Patch]
```csharp
public override void Explode()
{
	BaseEntity baseEntity = GameManager.server.CreateEntity(EntityToCreate.resourcePath);
	if ((bool)baseEntity)
	{
		UnityEngine.Vector3 vector = new UnityEngine.Vector3(UnityEngine.Random.Range(-20f, 20f), 0f, UnityEngine.Random.Range(-20f, 20f));
		baseEntity.SendMessage("InitDropPosition", base.transform.position + vector, UnityEngine.SendMessageOptions.DontRequireReceiver);
		baseEntity.Spawn();
	}
	Invoke(FinishUp, 210f);
	SetFlag(BaseEntity.Flags.On, b: true);
	SendNetworkUpdateImmediate();
}

```
