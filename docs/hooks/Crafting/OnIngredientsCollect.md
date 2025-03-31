<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnIngredientsCollect
```csharp
public void CollectIngredients(ItemBlueprint bp, ItemCraftTask task, int amount = 1, BasePlayer player = null)
{
	System.Collections.Generic.List<Item> list = new System.Collections.Generic.List<Item>();
	foreach (ItemAmount ingredient in bp.GetIngredients())
	{
		CollectIngredient(ingredient.itemid, (int)ingredient.amount * amount, list);
	}
	foreach (Item item in list)
	{
		item.CollectedForCrafting(player);
	}
	task.takenItems = list;
}

```
