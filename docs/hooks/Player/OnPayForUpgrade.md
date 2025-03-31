# OnPayForUpgrade
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when resources are about to be consumed for upgrading a building piece.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPayForUpgrade()
{
	Puts("OnPayForUpgrade has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BuildingBlock]
public void PayForUpgrade(ConstructionGrade g, BasePlayer player)
{
	if (player.IsInCreativeMode && ConVar.Creative.freeBuild)
	{
		return;
	}
	System.Collections.Generic.List<Item> list = new System.Collections.Generic.List<Item>();
	foreach (ItemAmount item in g.CostToBuild(grade))
	{
		player.inventory.Take(list, item.itemid, (int)item.amount);
		ItemDefinition itemDefinition = ItemManager.FindItemDefinition(item.itemid);
		Facepunch.Rust.Analytics.Azure.LogResource(Facepunch.Rust.Analytics.Azure.ResourceMode.Consumed, "upgrade_block", itemDefinition.shortname, (int)item.amount, this, null, safezone: false, null, player.userID);
		player.Command("note.inv " + item.itemid + " " + item.amount * -1f);
	}
	foreach (Item item2 in list)
	{
		item2.Remove();
	}
}

```
:::
