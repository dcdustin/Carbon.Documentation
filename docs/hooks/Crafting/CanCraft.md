<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanCraft [PlayerBlueprints]
```csharp
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
