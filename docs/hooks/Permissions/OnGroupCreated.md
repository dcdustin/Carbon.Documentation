# OnGroupCreated
<Badge type="info" text="Permissions"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a new permission group is created.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnGroupCreated()
{
	Puts("OnGroupCreated has been fired!");
}
```
```csharp [Source — Carbon.Common @ Oxide.Core.Libraries.Permission]
public virtual bool CreateGroup(string group, string title, int rank)
{
	if (string.IsNullOrEmpty(group) || GroupExists(group))
	{
		return false;
	}
	Oxide.Core.Libraries.GroupData value = new Oxide.Core.Libraries.GroupData
	{
		Title = title,
		Rank = rank
	};
	if (!StringEx.IsLower(group))
	{
		group = group.ToLower();
	}
	groupdata.Add(group, value);
	Carbon.HookCaller.CallStaticHook(1889097028u, group, title, rank);
	return true;
}

```
:::
