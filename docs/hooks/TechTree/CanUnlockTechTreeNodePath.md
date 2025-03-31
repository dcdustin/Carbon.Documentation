<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUnlockTechTreeNodePath
```csharp
public bool PlayerHasPathForUnlock(BasePlayer player, TechTreeData.NodeInstance node)
{
	TechTreeData.NodeInstance entryNode = GetEntryNode();
	if (entryNode == null)
	{
		return false;
	}
	return CheckChainRecursive(player, entryNode, node);
}

```
