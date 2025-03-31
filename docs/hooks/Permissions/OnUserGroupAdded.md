<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnUserGroupAdded
```csharp
public virtual void AddUserGroup(string id, string name)
{
	if (GroupExists(name) && GetUserData(id).Groups.Add(name.ToLower()))
	{
		Carbon.HookCaller.CallStaticHook(3116013984u, id, name);
	}
}

```
