# OnGroupRankSet
<Badge type="info" text="Permissions"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a group's rank is changed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnGroupRankSet()
{
	Puts("OnGroupRankSet has been fired!");
}
```
```csharp [Source — Carbon.Common @ Oxide.Core.Libraries.Permission]
public virtual bool SetGroupRank(string group, int rank)
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
	if (value.Rank == rank)
	{
		return true;
	}
	value.Rank = rank;
	Carbon.HookCaller.CallStaticHook(407332709u, group, rank);
	return true;
}

```
:::
