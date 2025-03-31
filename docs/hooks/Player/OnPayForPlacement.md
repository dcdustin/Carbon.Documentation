<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPayForPlacement
Called when resources are about to be consumed for placing a deployable or structure.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPayForPlacement()
{
	Puts("OnPayForPlacement has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ Planner]
public void PayForPlacement(BasePlayer player, Construction component)
{
	if (player.IsInCreativeMode && ConVar.Creative.freeBuild)
	{
		return;
	}
	if (player.IsInTutorial)
	{
		TutorialIsland currentTutorialIsland = player.GetCurrentTutorialIsland();
		if (currentTutorialIsland != null)
		{
			currentTutorialIsland.OnPlayerBuiltConstruction(player);
		}
	}
	if (isTypeDeployable)
	{
		GetItem().UseItem();
		return;
	}
	System.Collections.Generic.List<Item> obj = Facepunch.Pool.Get<System.Collections.Generic.List<Item>>();
	foreach (ItemAmount item in component.defaultGrade.CostToBuild())
	{
		player.inventory.Take(obj, item.itemDef.itemid, (int)item.amount);
		player.Command("note.inv", item.itemDef.itemid, item.amount * -1f);
	}
	foreach (Item item2 in obj)
	{
		item2.Remove();
	}
	Facepunch.Pool.Free(ref obj, freeElements: false);
}

```
:::
