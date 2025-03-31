# OnRandomItemAward
<Badge type="info" text="Resource"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player is about to receive a random item reward (from an event or server reward).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRandomItemAward()
{
	Puts("OnRandomItemAward has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ RandomItemDispenser]
public bool TryAward(RandomItemDispenser.RandomItemChance itemChance, BasePlayer forPlayer, UnityEngine.Vector3 distributorPosition)
{
	float num = UnityEngine.Random.Range(0f, 1f);
	if (itemChance.Chance >= num)
	{
		Item item = ItemManager.Create(itemChance.Item, itemChance.Amount, 0uL);
		if (item != null)
		{
			item.SetItemOwnership(forPlayer, ItemOwnershipPhrases.GatheredPhrase);
			if ((bool)forPlayer)
			{
				forPlayer.GiveItem(item, BaseEntity.GiveItemReason.ResourceHarvested);
			}
			else
			{
				item.Drop(distributorPosition + UnityEngine.Vector3.up * 0.5f, UnityEngine.Vector3.up);
			}
		}
		return true;
	}
	return false;
}

```
:::
