# CanUnlockTechTreeNode
<Badge type="info" text="TechTree"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUnlockTechTreeNode()
{
	Puts("CanUnlockTechTreeNode has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ TechTreeData]
public bool PlayerCanUnlock(BasePlayer player, TechTreeData.NodeInstance node)
{
	if (PlayerHasPathForUnlock(player, node))
	{
		return !HasPlayerUnlocked(player, node);
	}
	return false;
}

```
:::
