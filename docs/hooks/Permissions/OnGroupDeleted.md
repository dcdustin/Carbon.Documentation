# OnGroupDeleted
<Badge type="info" text="Permissions"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
Called when a permission group is deleted.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnGroupDeleted(string group)
{
	Puts("OnGroupDeleted has been fired!");
}
```
```csharp [Source — Carbon.Common @ Oxide.Core.Libraries.Permission]
public virtual bool RemoveGroup(string group)
{
	if (!GroupExists(group))
	{
		return false;
	}
	if (!StringEx.IsLower(group))
	{
		group = group.ToLower();
	}
	bool flag = groupdata.Remove(group);
	if (flag)
	{
		foreach (Oxide.Core.Libraries.GroupData item in System.Linq.Enumerable.Where(groupdata.Values, (Oxide.Core.Libraries.GroupData groupData) => groupData.ParentGroup == group))
		{
			item.ParentGroup = string.Empty;
		}
	}
	if (System.Linq.Enumerable.Aggregate(userdata.Values, seed: false, (bool current, Oxide.Core.Libraries.UserData userData) => current | userData.Groups.Remove(group)))
	{
		SaveUsers();
	}
	if (flag)
	{
		Carbon.HookCaller.CallStaticHook(3702696305u, group);
	}
	return true;
}

```
:::
