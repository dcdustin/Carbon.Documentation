<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemUnwrap
Called when an item (like a gift present) is unwrapped.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemUnwrap()
{
	Puts("OnItemUnwrap has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ItemModUnwrap]
public override void ServerCommand(Item item, string command, BasePlayer player)
{
	if (command == "unwrap" && item.amount > 0)
	{
		item.UseItem();
		int num = UnityEngine.Random.Range(minTries, maxTries + 1);
		ItemOwnershipShare ownership = default(ItemOwnershipShare);
		if (OwnershipPhrase != null && !string.IsNullOrEmpty(OwnershipPhrase.token))
		{
			ItemOwnershipShare itemOwnershipShare = default(ItemOwnershipShare);
			itemOwnershipShare.username = player.displayName;
			itemOwnershipShare.reason = OwnershipPhrase.token;
			ownership = itemOwnershipShare;
		}
		for (int i = 0; i < num; i++)
		{
			revealList.SpawnIntoContainer(player.inventory.containerMain, ownership);
		}
		if (successEffect.isValid)
		{
			Effect.server.Run(successEffect.resourcePath, player.eyes.position);
		}
	}
}

```
:::
