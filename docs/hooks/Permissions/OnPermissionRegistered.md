# OnPermissionRegistered
<Badge type="info" text="Permissions"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a plugin registers a new permission.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPermissionRegistered(string permission, Oxide.Core.Plugins.Plugin plugin)
{
	Puts("OnPermissionRegistered has been fired!");
}
```
```csharp [Source — Carbon.Common @ Oxide.Core.Libraries.Permission]
public virtual void RegisterPermission(string name, Carbon.Base.BaseHookable owner)
{
	if (string.IsNullOrEmpty(name))
	{
		return;
	}
	if (!StringEx.IsLower(name))
	{
		name = name.ToLower();
	}
	if (PermissionExists(name, owner))
	{
		return;
	}
	if (PermissionExists(name))
	{
		Carbon.Logger.Warn("Trying to register permission '" + name + "' but already used by another plugin. (Requestee plugin '" + owner.Name + "')");
	}
	else
	{
		if (!permset.TryGetValue(owner, out var value))
		{
			value = new System.Collections.Generic.HashSet<string>();
			permset.Add(owner, value);
		}
		value.Add(name);
		Carbon.HookCaller.CallStaticHook(4257240972u, name, owner);
	}
}

```
:::
