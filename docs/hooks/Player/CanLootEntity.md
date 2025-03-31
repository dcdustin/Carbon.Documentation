# CanLootEntity
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player attempts to loot an entity or container. Plugins can use this to allow or block the looting action.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanLootEntity()
{
	Puts("CanLootEntity has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ IndustrialCrafter]
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
:::
