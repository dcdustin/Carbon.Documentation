# CanUnlockTechTreeNodePath
<Badge type="info" text="TechTree"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUnlockTechTreeNodePath()
{
	Puts("CanUnlockTechTreeNodePath has been fired!");
	return (System.Boolean)default;
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
