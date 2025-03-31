<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUseGesture
```csharp
public bool IsOwnedBy(BasePlayer player, bool allowCinematic = false)
{
	if (forceUnlock)
	{
		return true;
	}
	if (gestureType == GestureConfig.GestureType.NPC)
	{
		if (player != null)
		{
			return player.IsNpc;
		}
		return false;
	}
	if (gestureType == GestureConfig.GestureType.Cinematic)
	{
		if (!allowCinematic && (!(player != null) || !player.IsAdmin))
		{
			return ConVar.Server.cinematic;
		}
		return true;
	}
	if (dlcItem != null && player != null)
	{
		return dlcItem.CanUse(player);
	}
	if (inventoryItem != null && player != null && player.blueprints.steamInventory.HasItem(inventoryItem.id))
	{
		return true;
	}
	return false;
}

```
