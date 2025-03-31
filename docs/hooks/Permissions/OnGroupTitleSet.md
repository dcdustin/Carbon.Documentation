# OnGroupTitleSet
<Badge type="info" text="Permissions"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a group's title is changed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnGroupTitleSet()
{
	Puts("OnGroupTitleSet has been fired!");
}
```
```csharp [Source — Carbon.Common @ Oxide.Core.Libraries.Permission]
public virtual bool SetGroupTitle(string group, string title)
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
	if (value.Title == title)
	{
		return true;
	}
	value.Title = title;
	Carbon.HookCaller.CallStaticHook(1035562059u, group, title);
	return true;
}

```
:::
