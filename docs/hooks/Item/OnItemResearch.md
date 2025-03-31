# OnItemResearch
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player starts researching an item at a research table.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemResearch(ResearchTable researchTable, Item local1, BasePlayer local0)
{
	Puts("OnItemResearch has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ResearchTable]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void DoResearch(BaseEntity.RPCMessage msg)
{
	if (IsResearching())
	{
		return;
	}
	BasePlayer player = msg.player;
	Item targetItem = GetTargetItem();
	if (targetItem != null && targetItem.amount <= 1 && IsItemResearchable(targetItem))
	{
		targetItem.CollectedForCrafting(player);
		researchFinishedTime = UnityEngine.Time.realtimeSinceStartup + researchDuration;
		Invoke(ResearchAttemptFinished, researchDuration);
		base.inventory.SetLocked(isLocked: true);
		int scrapCost = ScrapForResearch(targetItem);
		Facepunch.Rust.Analytics.Azure.OnResearchStarted(player, this, targetItem, scrapCost);
		SetFlag(BaseEntity.Flags.On, b: true);
		SendNetworkUpdate();
		player.inventory.loot.SendImmediate();
		if (researchStartEffect.isValid)
		{
			Effect.server.Run(researchStartEffect.resourcePath, this, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
		}
		msg.player.GiveAchievement("RESEARCH_ITEM");
	}
}

```
:::
