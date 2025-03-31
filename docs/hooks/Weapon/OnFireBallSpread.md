<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFireBallSpread
```csharp
public void TryToSpread()
{
	float num = 0.9f - generation * 0.1f;
	if (UnityEngine.Random.Range(0f, 1f) < num && spreadSubEntity.isValid)
	{
		BaseEntity baseEntity = GameManager.server.CreateEntity(spreadSubEntity.resourcePath);
		if ((bool)baseEntity)
		{
			baseEntity.transform.position = base.transform.position + UnityEngine.Vector3.up * 0.25f;
			baseEntity.Spawn();
			UnityEngine.Vector3 modifiedAimConeDirection = AimConeUtil.GetModifiedAimConeDirection(45f, UnityEngine.Vector3.up);
			baseEntity.creatorEntity = ((creatorEntity == null) ? baseEntity : creatorEntity);
			baseEntity.SetVelocity(modifiedAimConeDirection * UnityEngine.Random.Range(5f, 8f));
			baseEntity.SendMessage("SetGeneration", generation + 1f);
		}
	}
}

```
