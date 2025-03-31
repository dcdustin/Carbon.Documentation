<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnExperimentStarted
Called after a blueprint experiment has started.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnExperimentStarted()
{
	Puts("OnExperimentStarted has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Workbench]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_BeginExperiment(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (player == null || IsWorking())
	{
		return;
	}
	ProtoBuf.PersistantPlayer persistantPlayerInfo = player.PersistantPlayerInfo;
	int num = UnityEngine.Random.Range(0, experimentalItems.subSpawn.Length);
	for (int i = 0; i < experimentalItems.subSpawn.Length; i++)
	{
		int num2 = i + num;
		if (num2 >= experimentalItems.subSpawn.Length)
		{
			num2 -= experimentalItems.subSpawn.Length;
		}
		ItemDefinition itemDef = experimentalItems.subSpawn[num2].category.items[0].itemDef;
		if ((bool)itemDef.Blueprint && !itemDef.Blueprint.defaultBlueprint && itemDef.Blueprint.userCraftable && itemDef.Blueprint.isResearchable && !itemDef.Blueprint.NeedsSteamItem && !itemDef.Blueprint.NeedsSteamDLC && !persistantPlayerInfo.unlockedItems.Contains(itemDef.itemid))
		{
			pendingBlueprint = itemDef;
			break;
		}
	}
	if (pendingBlueprint == null)
	{
		player.ChatMessage("You have already unlocked everything for this workbench tier.");
		return;
	}
	Item slot = base.inventory.GetSlot(0);
	if (slot != null)
	{
		if (!slot.MoveToContainer(player.inventory.containerMain))
		{
			slot.Drop(GetDropPosition(), GetDropVelocity());
		}
		player.inventory.loot.SendImmediate();
	}
	if (experimentStartEffect.isValid)
	{
		Effect.server.Run(experimentStartEffect.resourcePath, this, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
	}
	SetFlag(BaseEntity.Flags.On, b: true);
	base.inventory.SetLocked(isLocked: true);
	CancelInvoke(ExperimentComplete);
	Invoke(ExperimentComplete, 5f);
	SendNetworkUpdate();
}

```
:::
