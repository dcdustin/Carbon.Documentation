<Badge type="danger" text="Carbon Compatible"/>
# IResearchDuration
Allows modifying how long research at a research table takes.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IResearchDuration()
{
	Puts("IResearchDuration has been fired!");
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
