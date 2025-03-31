<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityGroundMissing
Called when an entity’s ground support is missing, causing it to be destroyed (e.g., a structure piece has no foundation support).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEntityGroundMissing()
{
	Puts("OnEntityGroundMissing has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ DestroyOnGroundMissing]
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
:::
