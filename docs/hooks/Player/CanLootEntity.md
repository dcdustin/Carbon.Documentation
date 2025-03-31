<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanLootEntity [IndustrialCrafter]
```csharp
public virtual bool PlayerOpenLoot(BasePlayer player, string panelToOpen = "", bool doPositionChecks = true)
{
	if (NeedsBuildingPrivilegeToUse && !player.CanBuild())
	{
		return false;
	}
	if (OnlyOneUser && IsOpen())
	{
		player.ChatMessage("Already in use");
		return false;
	}
	if (player.inventory.loot.StartLootingEntity(this, doPositionChecks))
	{
		SetFlag(BaseEntity.Flags.Open, b: true);
		player.inventory.loot.AddContainer(_inventory);
		player.inventory.loot.SendImmediate();
		player.ClientRPC(RpcTarget.Player("RPC_OpenLootPanel", player), LootPanelName);
		SendNetworkUpdate();
		return true;
	}
	return false;
}

```
