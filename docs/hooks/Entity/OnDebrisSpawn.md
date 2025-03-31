# OnDebrisSpawn
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a building part decays and spawns debris (collapsed structure debris entity created).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnDebrisSpawn(DecayEntity decayEntity)
{
	Puts("OnDebrisSpawn has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ DecayEntity]
public void SpawnDebris(UnityEngine.Vector3 localPos, UnityEngine.Quaternion rot, bool dropToTerrain)
{
	UnityEngine.Vector3 vector = base.transform.TransformPoint(localPos);
	if (dropToTerrain && UnityEngine.Physics.Raycast(vector, UnityEngine.Vector3.down, out var hitInfo, 6f, 8388608))
	{
		float num = vector.y - hitInfo.point.y;
		vector.y = hitInfo.point.y;
		localPos.y -= num;
	}
	System.Collections.Generic.List<DebrisEntity> obj = Facepunch.Pool.Get<System.Collections.Generic.List<DebrisEntity>>();
	Vis.Entities(vector, 0.1f, obj, 256);
	if (obj.Count > 0)
	{
		Facepunch.Pool.FreeUnmanaged(ref obj);
		return;
	}
	BaseEntity baseEntity = GameManager.server.CreateEntity(debrisPrefab.resourcePath, base.transform.TransformPoint(localPos), base.transform.rotation * rot);
	if ((bool)baseEntity)
	{
		baseEntity.SetParent(parentEntity.Get(serverside: true), worldPositionStays: true);
		baseEntity.Spawn();
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
}

```
:::
