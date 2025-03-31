<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnGroupCreated
```csharp
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
