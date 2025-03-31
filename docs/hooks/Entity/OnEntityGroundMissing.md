<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityGroundMissing
```csharp
public void OnGroundMissing()
{
	BaseEntity baseEntity = UnityEngine.GameObjectEx.ToBaseEntity(base.gameObject);
	if (baseEntity != null)
	{
		BaseCombatEntity baseCombatEntity = baseEntity as BaseCombatEntity;
		if (baseCombatEntity != null)
		{
			baseCombatEntity.Die();
		}
		else
		{
			baseEntity.Kill(BaseNetworkable.DestroyMode.Gib);
		}
	}
}

```
