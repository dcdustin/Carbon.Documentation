<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLootEntity
Triggered when a player begins looting an entity or container.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnLootEntity()
{
	Puts("OnLootEntity has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ PlayerLoot]
#define UNITY_ASSERTIONS
public bool StartLootingEntity(BaseEntity targetEntity, bool doPositionChecks = true)
{
	Clear();
	if (!targetEntity)
	{
		return false;
	}
	if (!targetEntity.OnStartBeingLooted(base.baseEntity))
	{
		return false;
	}
	UnityEngine.Assertions.Assert.IsTrue(targetEntity.isServer, "Assure is server");
	PositionChecks = doPositionChecks;
	entitySource = targetEntity;
	itemSource = null;
	MarkDirty();
	if (targetEntity is ILootableEntity lootableEntity)
	{
		lootableEntity.LastLootedBy = base.baseEntity.userID;
		lootableEntity.LastLootedByPlayer = base.baseEntity;
	}
	return true;
}

```
:::
