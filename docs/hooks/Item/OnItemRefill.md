# OnItemRefill
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an item's 'refill' command is used to restore its condition (partial repair).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemRefill()
{
	Puts("OnItemRefill has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ItemModRepair]
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
:::
