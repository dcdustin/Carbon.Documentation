# OnGroupPermissionRevoked
<Badge type="info" text="Permissions"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a permission is revoked from a group.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnGroupPermissionRevoked()
{
	Puts("OnGroupPermissionRevoked has been fired!");
}
```
```csharp [Source — Carbon.Common @ Oxide.Core.Libraries.Permission]
public virtual bool RevokeGroupPermission(string name, string perm)
{
	if (!GroupExists(name) || string.IsNullOrEmpty(perm))
	{
		return false;
	}
	if (!StringEx.IsLower(name))
	{
		name = name.ToLower();
	}
	if (!groupdata.TryGetValue(name, out var value))
	{
		return false;
	}
	if (!StringEx.IsLower(perm))
	{
		perm = perm.ToLower();
	}
	if (perm.EndsWith(StarStr))
	{
		if (!perm.Equals(StarStr))
		{
			perm = perm.TrimEnd(Star).ToLower();
			return value.Perms.RemoveWhere(delegate(string s)
			{
				if (!s.StartsWith(perm))
				{
					return false;
				}
				Carbon.HookCaller.CallStaticHook(3443835039u, name, s);
				return true;
			}) > 0;
		}
		if (value.Perms.Count <= 0)
		{
			return false;
		}
		foreach (string perm2 in value.Perms)
		{
			Carbon.HookCaller.CallStaticHook(3443835039u, name, perm2);
		}
		value.Perms.Clear();
		return true;
	}
	if (!value.Perms.Remove(perm))
	{
		return false;
	}
	Carbon.HookCaller.CallStaticHook(3443835039u, name, perm);
	return true;
}

```
:::
