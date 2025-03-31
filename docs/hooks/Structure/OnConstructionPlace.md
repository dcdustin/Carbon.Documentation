# OnConstructionPlace
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnConstructionPlace()
{
	Puts("OnConstructionPlace has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ Planner]
public UnityEngine.GameObject DoPlacement(Construction.Target placement, Construction component)
{
	BasePlayer ownerPlayer = GetOwnerPlayer();
	if (!ownerPlayer)
	{
		return null;
	}
	BaseEntity baseEntity = component.CreateConstruction(placement, bNeedsValidPlacement: true);
	if (!baseEntity)
	{
		return null;
	}
	float num = 1f;
	float num2 = 0f;
	Item ownerItem = GetOwnerItem();
	if (ownerItem != null)
	{
		baseEntity.skinID = ownerItem.skin;
		if (ownerItem.hasCondition)
		{
			num = ownerItem.conditionNormalized;
		}
	}
	baseEntity.gameObject.AwakeFromInstantiate();
	BuildingBlock buildingBlock = baseEntity as BuildingBlock;
	if ((bool)buildingBlock)
	{
		buildingBlock.blockDefinition = PrefabAttribute.server.Find<Construction>(buildingBlock.prefabID);
		if (!buildingBlock.blockDefinition)
		{
			UnityEngine.Debug.LogError("Placing a building block that has no block definition!");
			return null;
		}
		buildingBlock.SetGrade(buildingBlock.blockDefinition.defaultGrade.gradeBase.type);
	}
	BaseCombatEntity baseCombatEntity = baseEntity as BaseCombatEntity;
	if ((bool)baseCombatEntity)
	{
		num2 = ((buildingBlock != null) ? buildingBlock.currentGrade.maxHealth : baseCombatEntity.startHealth);
		baseCombatEntity.ResetLifeStateOnSpawn = false;
		baseCombatEntity.InitializeHealth(num2 * num, baseCombatEntity.StartMaxHealth());
	}
	baseEntity.OnPlaced(ownerPlayer);
	baseEntity.OwnerID = ownerPlayer.userID;
	baseEntity.Spawn();
	if ((bool)buildingBlock)
	{
		Effect.server.Run("assets/bundled/prefabs/fx/build/frame_place.prefab", baseEntity, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
	}
	StabilityEntity stabilityEntity = baseEntity as StabilityEntity;
	if ((bool)stabilityEntity)
	{
		stabilityEntity.UpdateSurroundingEntities();
	}
	return baseEntity.gameObject;
}

```
:::
