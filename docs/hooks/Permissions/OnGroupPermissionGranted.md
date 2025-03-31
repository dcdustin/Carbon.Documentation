# OnGroupPermissionGranted
<Badge type="info" text="Permissions"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a permission is granted to a group.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnGroupPermissionGranted(string group, string permission)
{
	Puts("OnGroupPermissionGranted has been fired!");
}
```
```csharp [Source — Carbon.Common @ Oxide.Core.Libraries.Permission]
public virtual bool GrantGroupPermission(string name, string perm, Carbon.Base.BaseHookable owner)
{
	if (!PermissionExists(perm, owner) || !GroupExists(name))
	{
		return false;
	}
	if (!StringEx.IsLower(name))
	{
		name = name.ToLower();
	}
	if (!groupdata.TryGetValue(name, out var data))
	{
		return false;
	}
	if (!StringEx.IsLower(perm))
	{
		perm = perm.ToLower();
	}
	if (perm.EndsWith(StarStr))
	{
		System.Collections.Generic.HashSet<string> value;
		if (owner == null)
		{
			value = new System.Collections.Generic.HashSet<string>(System.Linq.Enumerable.SelectMany(permset.Values, (System.Collections.Generic.HashSet<string> v) => v));
		}
		else if (!permset.TryGetValue(owner, out value))
		{
			return false;
		}
		if (perm.Equals(StarStr))
		{
			return System.Linq.Enumerable.Aggregate(value, seed: false, delegate(bool c, string s)
			{
				if (!(c | data.Perms.Add(s)))
				{
					return false;
				}
				Carbon.HookCaller.CallStaticHook(2479711677u, name, perm);
				return true;
			});
		}
		perm = perm.TrimEnd(Star).ToLower();
		return System.Linq.Enumerable.Aggregate(System.Linq.Enumerable.Where(value, (string s) => s.StartsWith(perm)), seed: false, delegate(bool c, string s)
		{
			if (!(c | data.Perms.Add(s)))
			{
				return false;
			}
			Carbon.HookCaller.CallStaticHook(2479711677u, name, perm);
			return true;
		});
	}
	if (!data.Perms.Add(perm))
	{
		return false;
	}
	Carbon.HookCaller.CallStaticHook(2479711677u, name, perm);
	return true;
}

```
:::
