<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemUpgrade
```csharp
public override void ServerCommand(Item item, string command, BasePlayer player)
{
	if (!(command == "upgrade_item") || item.amount < numForUpgrade)
	{
		return;
	}
	if (UnityEngine.Random.Range(0f, 1f) <= upgradeSuccessChance)
	{
		item.UseItem(numForUpgrade);
		Item item2 = ItemManager.Create(upgradedItem, numUpgradedItem, 0uL);
		item2.SetItemOwnership(player, ItemOwnershipPhrases.UpgradeItem);
		if (!item2.MoveToContainer(player.inventory.containerMain))
		{
			item2.Drop(player.GetDropPosition(), player.GetDropVelocity());
		}
		if (successEffect.isValid)
		{
			Effect.server.Run(successEffect.resourcePath, player.eyes.position);
		}
	}
	else
	{
		item.UseItem(numToLoseOnFail);
		if (failEffect.isValid)
		{
			Effect.server.Run(failEffect.resourcePath, player.eyes.position);
		}
	}
}

```
