# OnGroupCreated
<Badge type="info" text="Permissions"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
Called when a new permission group is created.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnGroupCreated(string group, string title, int rank)
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
