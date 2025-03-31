# OnEntityGroundMissing
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an entity’s ground support is missing, causing it to be destroyed (e.g., a structure piece has no foundation support).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEntityGroundMissing(BaseEntity local0)
{
	Puts("OnEntityGroundMissing has been fired!");
	return (object)default;
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
