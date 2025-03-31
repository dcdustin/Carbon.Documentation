# OnPlayerStudyBlueprint
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a player studies a blueprint at a research table.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerStudyBlueprint(BasePlayer player, Item item)
{
	Puts("OnPlayerStudyBlueprint has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ItemModStudyBlueprint]
public override void ServerCommand(Item item, string command, BasePlayer player)
{
	if (command != "study" || !item.IsBlueprint())
	{
		return;
	}
	if (item.GetOwnerPlayer() != player && player.inventory.GetBackpackWithInventory()?.contents != item.parent)
	{
		bool flag = false;
		foreach (ItemContainer container in player.inventory.loot.containers)
		{
			if (item.GetRootContainer() == container)
			{
				flag = true;
				break;
			}
		}
		if (!flag)
		{
			return;
		}
	}
	if (IsBlueprintUnlocked(item, player, out var blueprintTargetDef, out var blueprint))
	{
		return;
	}
	Item item2 = item;
	if (item.amount > 1)
	{
		item2 = item.SplitItem(1);
	}
	item2.UseItem();
	player.blueprints.Unlock(blueprintTargetDef);
	Facepunch.Rust.Analytics.Azure.OnBlueprintLearned(player, blueprintTargetDef, "blueprint", ResearchTable.ScrapForResearch(blueprintTargetDef), player);
	if (blueprint != null && blueprint.additionalUnlocks != null && blueprint.additionalUnlocks.Count > 0)
	{
		foreach (ItemDefinition additionalUnlock in blueprint.additionalUnlocks)
		{
			player.blueprints.Unlock(additionalUnlock);
			Facepunch.Rust.Analytics.Azure.OnBlueprintLearned(player, additionalUnlock, "blueprint", 0, player);
		}
	}
	if (studyEffect.isValid)
	{
		Effect.server.Run(studyEffect.resourcePath, player, StringPool.Get("head"), UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
	}
}

```
:::
