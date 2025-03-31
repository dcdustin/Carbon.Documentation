# OnPermissionsUnregistered
<Badge type="info" text="Permissions"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a plugin's permissions are unregistered (e.g., on plugin unload).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPermissionsUnregistered()
{
	Puts("OnPermissionsUnregistered has been fired!");
}
```
```csharp [Source — Carbon.Common @ Oxide.Core.Libraries.Permission]
public virtual void UnregisterPermissions(Carbon.Base.BaseHookable owner)
{
	if (owner != null && permset.TryGetValue(owner, out var value))
	{
		value.Clear();
		permset.Remove(owner);
		Carbon.HookCaller.CallStaticHook(2952085131u, owner);
	}
}

```
:::
