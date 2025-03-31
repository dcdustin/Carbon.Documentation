<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnGroupRankSet
```csharp
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
