# CanUnlockTechTreeNodePath
<Badge type="info" text="TechTree"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUnlockTechTreeNodePath(BasePlayer player, TechTreeData.NodeInstance node, TechTreeData techTreeData)
{
	Puts("CanUnlockTechTreeNodePath has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ TechTreeData]
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
:::
