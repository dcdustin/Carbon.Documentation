# OnIngredientsCollect
<Badge type="info" text="Crafting"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when ingredients for a crafting task are collected (the server gathers required items to craft an item).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnIngredientsCollect(ItemCrafter itemCrafter)
{
	Puts("OnIngredientsCollect has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ItemCrafter]
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
:::
