<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnGroupParentSet
```csharp
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
