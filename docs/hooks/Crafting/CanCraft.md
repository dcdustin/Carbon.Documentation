<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanCraft
Called when a player attempts to craft an item. Plugins can use this to allow or prevent the crafting.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanCraft()
{
	Puts("CanCraft has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerBlueprints]
public bool CanCraft(int itemid, int skinItemId, ulong playerId)
{
	ItemDefinition itemDefinition = ItemManager.FindItemDefinition(itemid);
	if (itemDefinition == null)
	{
		return false;
	}
	if (skinItemId != 0 && !base.baseEntity.UnlockAllSkins && !CheckSkinOwnership(skinItemId, playerId))
	{
		return false;
	}
	if (base.baseEntity.currentCraftLevel < (float)itemDefinition.Blueprint.GetWorkbenchLevel())
	{
		return false;
	}
	if (HasUnlocked(itemDefinition))
	{
		return true;
	}
	return false;
}

```
:::
