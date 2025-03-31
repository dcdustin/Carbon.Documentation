<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFlameExplosion
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnFlameExplosion()
{
	Puts("OnFlameExplosion has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ FlameExplosive]
public void FlameExplode(UnityEngine.Vector3 surfaceNormal)
{
	if (!base.isServer)
	{
		return;
	}
	UnityEngine.Vector3 position = base.transform.position;
	if (blockCreateUnderwater && WaterLevel.Test(position, waves: true, volumes: false))
	{
		base.Explode();
		return;
	}
	UnityEngine.Collider component = GetComponent<UnityEngine.Collider>();
	if ((bool)component)
	{
		component.enabled = false;
	}
	for (int i = 0; (float)i < numToCreate; i++)
	{
		BaseEntity baseEntity = GameManager.server.CreateEntity(createOnExplode.resourcePath, position);
		if ((bool)baseEntity)
		{
			float num = (float)i / numToCreate;
			UnityEngine.Vector3 modifiedAimConeDirection = AimConeUtil.GetModifiedAimConeDirection(spreadAngle * spreadCurve.Evaluate(num), surfaceNormal);
			float y = UnityEngine.Random.Range(0f, 360f);
			UnityEngine.Quaternion rotation = UnityEngine.Quaternion.Euler(0f, y, 0f);
			baseEntity.transform.SetPositionAndRotation(position, rotation);
			baseEntity.creatorEntity = ((creatorEntity == null) ? baseEntity : creatorEntity);
			baseEntity.Spawn();
			UnityEngine.Vector3 vector = modifiedAimConeDirection.normalized * UnityEngine.Random.Range(minVelocity, maxVelocity) * velocityCurve.Evaluate(num * UnityEngine.Random.Range(1f, 1.1f));
			FireBall component2 = baseEntity.GetComponent<FireBall>();
			if (component2 != null)
			{
				component2.SetDelayedVelocity(vector);
			}
			else
			{
				baseEntity.SetVelocity(vector);
			}
		}
	}
	base.Explode();
}

```
:::
