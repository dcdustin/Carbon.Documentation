<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemDeployed
Called when a deployable item is placed into the world.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemDeployed()
{
	Puts("OnItemDeployed has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Deployer]
public void DoDeploy_Slot(Deployable deployable, UnityEngine.Ray ray, NetworkableId entityID)
{
	if (!HasItemAmount())
	{
		return;
	}
	BasePlayer ownerPlayer = GetOwnerPlayer();
	if (!ownerPlayer)
	{
		return;
	}
	if (!ownerPlayer.CanBuild())
	{
		ownerPlayer.ShowToast(GameTip.Styles.Error, ConstructionErrors.NoPermission, false);
		return;
	}
	BaseEntity baseEntity = BaseNetworkable.serverEntities.Find(entityID) as BaseEntity;
	if (baseEntity == null || !baseEntity.HasSlot(deployable.slot) || baseEntity.GetSlot(deployable.slot) != null)
	{
		return;
	}
	if (ownerPlayer.Distance(baseEntity) > 3f)
	{
		ownerPlayer.ShowToast(GameTip.Styles.Error, ConstructionErrors.TooFarAway, false);
		return;
	}
	if (!ownerPlayer.CanBuild(baseEntity.WorldSpaceBounds()))
	{
		ownerPlayer.ShowToast(GameTip.Styles.Error, ConstructionErrors.NoPermission, false);
		return;
	}
	if (ownerPlayer.IsInTutorial)
	{
		TutorialIsland currentTutorialIsland = ownerPlayer.GetCurrentTutorialIsland();
		if (currentTutorialIsland != null && !currentTutorialIsland.CheckPlacement(ownerPlayer, deployable, baseEntity.transform.position, baseEntity.transform.rotation))
		{
			return;
		}
	}
	Item ownerItem = GetOwnerItem();
	ItemModDeployable modDeployable = GetModDeployable();
	BaseEntity baseEntity2 = GameManager.server.CreateEntity(modDeployable.entityPrefab.resourcePath);
	if (baseEntity2 != null)
	{
		baseEntity2.skinID = ownerItem.skin;
		baseEntity2.SetParent(baseEntity, baseEntity.GetSlotAnchorName(deployable.slot));
		baseEntity2.OwnerID = ownerPlayer.userID;
		baseEntity2.OnDeployed(baseEntity, ownerPlayer, ownerItem);
		baseEntity2.Spawn();
		baseEntity.SetSlot(deployable.slot, baseEntity2);
		if (deployable.placeEffect.isValid)
		{
			Effect.server.Run(deployable.placeEffect.resourcePath, baseEntity.transform.position, UnityEngine.Vector3.up);
		}
		if (ownerPlayer.IsInTutorial)
		{
			TutorialIsland currentTutorialIsland2 = ownerPlayer.GetCurrentTutorialIsland();
			if (currentTutorialIsland2 != null)
			{
				currentTutorialIsland2.OnPlayerBuiltConstruction(ownerPlayer);
			}
		}
		if (GetOwnerItemDefinition() != null)
		{
			ownerPlayer.ProcessMissionEvent(BaseMission.MissionEventType.DEPLOY, new BaseMission.MissionEventPayload
			{
				WorldPosition = baseEntity2.transform.position,
				UintIdentifier = baseEntity2.prefabID,
				IntIdentifier = GetOwnerItemDefinition().itemid
			}, 1f);
		}
	}
	modDeployable.OnDeployed(baseEntity2, ownerPlayer);
	Facepunch.Rust.Analytics.Azure.OnEntityBuilt(baseEntity2, ownerPlayer);
	if (!ownerPlayer.IsInCreativeMode || !ConVar.Creative.freeBuild)
	{
		UseItemAmount(1);
	}
}

```
:::
