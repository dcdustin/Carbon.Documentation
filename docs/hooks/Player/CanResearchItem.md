# CanResearchItem
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player attempts to research an item blueprint, to decide if they can proceed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanResearchItem(BasePlayer local0, Item local1)
{
	Puts("CanResearchItem has been fired!");
	return (object)default;
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
