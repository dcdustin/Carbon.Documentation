# OnGroupParentSet
<Badge type="info" text="Permissions"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a permission group's parent group is changed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnGroupParentSet()
{
	Puts("OnGroupParentSet has been fired!");
}
```
```csharp [Source — Carbon.Common @ Oxide.Core.Libraries.Permission]
public virtual bool SetGroupParent(string group, string parent)
{
	if (!GroupExists(group))
	{
		return false;
	}
	if (!StringEx.IsLower(group))
	{
		group = group.ToLower();
	}
	if (!groupdata.TryGetValue(group, out var value))
	{
		return false;
	}
	if (string.IsNullOrEmpty(parent))
	{
		value.ParentGroup = null;
		return true;
	}
	if (!StringEx.IsLower(parent))
	{
		parent = parent.ToLower();
	}
	if (!GroupExists(parent) || group.Equals(parent))
	{
		return false;
	}
	if (!string.IsNullOrEmpty(value.ParentGroup) && value.ParentGroup.Equals(parent))
	{
		return true;
	}
	if (HasCircularParent(group, parent))
	{
		return false;
	}
	value.ParentGroup = parent;
	Carbon.HookCaller.CallStaticHook(3763369361u, group, parent);
	return true;
}

```
:::
