<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUnlockTechTreeNode
```csharp
public bool PlayerCanUnlock(BasePlayer player, TechTreeData.NodeInstance node)
{
	if (PlayerHasPathForUnlock(player, node))
	{
		return !HasPlayerUnlocked(player, node);
	}
	return false;
}

```
