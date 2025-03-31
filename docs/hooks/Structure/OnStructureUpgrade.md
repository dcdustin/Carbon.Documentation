<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnStructureUpgrade
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnStructureUpgrade()
{
	Puts("OnStructureUpgrade has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BuildingBlock]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void DoUpgradeToGrade(BaseEntity.RPCMessage msg)
{
	if (!msg.player.CanInteract())
	{
		return;
	}
	ConstructionGrade constructionGrade = blockDefinition.GetGrade((BuildingGrade.Enum)msg.read.Int32(), msg.read.UInt64());
	if (constructionGrade == null)
	{
		return;
	}
	if (!CanChangeToGrade(constructionGrade.gradeBase.type, constructionGrade.gradeBase.skin, msg.player))
	{
		if (!(DeployVolume.LastDeployHit != null))
		{
			return;
		}
		BaseEntity baseEntity = UnityEngine.GameObjectEx.ToBaseEntity(DeployVolume.LastDeployHit);
		if (baseEntity != null && baseEntity is BasePlayer basePlayer)
		{
			ulong currentTeam = msg.player.currentTeam;
			if (currentTeam != 0L && currentTeam == basePlayer.currentTeam)
			{
				string playerNameStreamSafe = NameHelper.GetPlayerNameStreamSafe(msg.player, basePlayer);
				msg.player.ShowToast(GameTip.Styles.Error, ConstructionErrors.BlockedByPlayer, false, playerNameStreamSafe);
			}
		}
	}
	else
	{
		if (!CanAffordUpgrade(constructionGrade.gradeBase.type, constructionGrade.gradeBase.skin, msg.player))
		{
			return;
		}
		if (base.SecondsSinceAttacked < 30f)
		{
			msg.player.ShowToast(GameTip.Styles.Error, ConstructionErrors.CantUpgradeRecentlyDamaged, false, (30f - base.SecondsSinceAttacked).ToString("N0"));
			return;
		}
		if (!constructionGrade.gradeBase.alwaysUnlock && constructionGrade.gradeBase.skin != 0L && !msg.player.blueprints.steamInventory.HasItem((int)constructionGrade.gradeBase.skin))
		{
			msg.player.ShowToast(GameTip.Styles.Error, ConstructionErrors.SkinNotOwned, false);
			return;
		}
		PayForUpgrade(constructionGrade, msg.player);
		if (msg.player != null)
		{
			playerCustomColourToApply = GetShippingContainerBlockColourForPlayer(msg.player);
		}
		ClientRPC(RpcTarget.NetworkGroup("DoUpgradeEffect"), (int)constructionGrade.gradeBase.type, constructionGrade.gradeBase.skin);
		BuildingGrade.Enum @enum = grade;
		Facepunch.Rust.Analytics.Azure.OnBuildingBlockUpgraded(msg.player, this, constructionGrade.gradeBase.type, playerCustomColourToApply, constructionGrade.gradeBase.skin);
		OnSkinChanged(skinID, constructionGrade.gradeBase.skin);
		ChangeGrade(constructionGrade.gradeBase.type, playEffect: true);
		if (msg.player != null && @enum != constructionGrade.gradeBase.type)
		{
			msg.player.ProcessMissionEvent(BaseMission.MissionEventType.UPGRADE_BUILDING_GRADE, new BaseMission.MissionEventPayload
			{
				NetworkIdentifier = net.ID,
				IntIdentifier = (int)constructionGrade.gradeBase.type
			}, 1f);
		}
		timePlaced = GetNetworkTime();
	}
}

```
:::
