<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPermissionsUnregistered
```csharp
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
