<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemRefill
```csharp
public override void ServerCommand(Item item, string command, BasePlayer player)
{
	if (command == "refill" && !player.IsSwimming() && HasCraftLevel(player) && !(item.conditionNormalized >= 1f))
	{
		float conditionNormalized = item.conditionNormalized;
		float maxConditionNormalized = item.maxConditionNormalized;
		item.DoRepair(conditionLost);
		if (successEffect.isValid)
		{
			Effect.server.Run(successEffect.resourcePath, player.eyes.position);
		}
		Facepunch.Rust.Analytics.Azure.OnItemRepaired(player, player.GetCachedCraftLevelWorkbench(), item, conditionNormalized, maxConditionNormalized);
	}
}

```
