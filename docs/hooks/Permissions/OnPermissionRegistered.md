<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPermissionRegistered
```csharp
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
