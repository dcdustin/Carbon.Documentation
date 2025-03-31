<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHelicopterDropCrate
```csharp
public void DropCrate()
{
	if (numCrates > 0)
	{
		UnityEngine.Vector3 pos = base.transform.position + UnityEngine.Vector3.down * 5f;
		UnityEngine.Quaternion rot = UnityEngine.Quaternion.Euler(0f, UnityEngine.Random.Range(0f, 360f), 0f);
		BaseEntity baseEntity = GameManager.server.CreateEntity(lockedCratePrefab.resourcePath, pos, rot);
		if ((bool)baseEntity)
		{
			baseEntity.SendMessage("SetWasDropped");
			baseEntity.Spawn();
		}
		numCrates--;
	}
}

```
