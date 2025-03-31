<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityBuilt
```csharp
public virtual void DoBuild(ProtoBuf.CreateBuilding msg)
{
	BasePlayer ownerPlayer = GetOwnerPlayer();
	if (!ownerPlayer)
	{
		return;
	}
	if (ConVar.AntiHack.objectplacement && ownerPlayer.TriggeredMovementAntiHack())
	{
		ownerPlayer.ShowToast(GameTip.Styles.Error, ConstructionErrors.AntihackWithReason, false, ownerPlayer.lastViolationType.ToString());
		return;
	}
	Construction construction = PrefabAttribute.server.Find<Construction>(msg.blockID);
	if (construction == null)
	{
		ownerPlayer.ShowToast(GameTip.Styles.Error, ConstructionErrors.CouldntFindConstruction, false);
		ConstructionErrors.Log(ownerPlayer, msg.blockID.ToString());
		return;
	}
	if (!CanAffordToPlace(construction))
	{
		using (ProtoBuf.ItemAmountList itemAmountList = Facepunch.Pool.Get<ProtoBuf.ItemAmountList>())
		{
			itemAmountList.amount = Facepunch.Pool.Get<System.Collections.Generic.List<float>>();
			itemAmountList.itemID = Facepunch.Pool.Get<System.Collections.Generic.List<int>>();
			GetConstructionCost(itemAmountList, construction);
			ownerPlayer.ClientRPC(RpcTarget.Player("Client_OnRepairFailedResources", ownerPlayer), itemAmountList);
			return;
		}
	}
	if (!ownerPlayer.CanBuild() && !construction.canBypassBuildingPermission)
	{
		ownerPlayer.ShowToast(GameTip.Styles.Error, ConstructionErrors.NoPermission, false);
		return;
	}
	Deployable deployable = GetDeployable(msg.entity);
	if (construction.deployable != deployable)
	{
		ownerPlayer.ShowToast(GameTip.Styles.Error, ConstructionErrors.DeployableMismatch, false);
		return;
	}
	Construction.Target target = default(Construction.Target);
	if (msg.entity.IsValid)
	{
		target.entity = BaseNetworkable.serverEntities.Find(msg.entity) as BaseEntity;
		if (target.entity == null)
		{
			ownerPlayer.ShowToast(GameTip.Styles.Error, ConstructionErrors.CouldntFindEntity, false);
			ConstructionErrors.Log(ownerPlayer, msg.entity.ToString());
			return;
		}
		msg.ray = new UnityEngine.Ray(target.entity.transform.TransformPoint(msg.ray.origin), target.entity.transform.TransformDirection(msg.ray.direction));
		msg.position = target.entity.transform.TransformPoint(msg.position);
		msg.normal = target.entity.transform.TransformDirection(msg.normal);
		msg.rotation = target.entity.transform.rotation * msg.rotation;
		if (msg.socket != 0)
		{
			string text = StringPool.Get(msg.socket);
			if (text != "")
			{
				target.socket = FindSocket(text, target.entity.prefabID);
			}
			if (target.socket == null)
			{
				ownerPlayer.ShowToast(GameTip.Styles.Error, ConstructionErrors.CouldntFindSocket, false);
				ConstructionErrors.Log(ownerPlayer, msg.socket.ToString());
				return;
			}
		}
		else if (target.entity is Door)
		{
			ownerPlayer.ShowToast(GameTip.Styles.Error, ConstructionErrors.CantDeployOnDoor, false);
			return;
		}
	}
	target.ray = msg.ray;
	target.onTerrain = msg.onterrain;
	target.position = msg.position;
	target.normal = msg.normal;
	target.rotation = msg.rotation;
	target.player = ownerPlayer;
	target.isHoldingShift = msg.isHoldingShift;
	target.valid = true;
	if (ShouldParent(target.entity, deployable))
	{
		UnityEngine.Vector3 position = ((target.socket != null) ? target.GetWorldPosition() : target.position);
		float num = target.entity.Distance(position);
		if (num > 1f)
		{
			ownerPlayer.ShowToast(GameTip.Styles.Error, ConstructionErrors.ParentTooFar, false);
			ConstructionErrors.Log(ownerPlayer, num.ToString());
			return;
		}
	}
	BaseEntity baseEntity = DoBuild(target, construction);
	if (baseEntity != null && baseEntity is BuildingBlock buildingBlock && ownerPlayer.IsInCreativeMode && ConVar.Creative.freeBuild)
	{
		ConstructionGrade constructionGrade = construction.grades[msg.setToGrade];
		if (buildingBlock.currentGrade != constructionGrade)
		{
			buildingBlock.ChangeGradeAndSkin(constructionGrade.gradeBase.type, constructionGrade.gradeBase.skin);
		}
	}
	if (baseEntity != null && baseEntity is DecayEntity decayEntity)
	{
		decayEntity.timePlaced = GetNetworkTime();
	}
}

```
