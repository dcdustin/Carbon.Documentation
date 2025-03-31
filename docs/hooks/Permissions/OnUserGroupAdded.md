<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnUserGroupAdded
Called when a user is added to a permission group.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserGroupAdded()
{
	Puts("OnUserGroupAdded has been fired!");
}
```
```csharp [Source — Carbon.Common @ Oxide.Core.Libraries.Permission]
public virtual void AddUserGroup(string id, string name)
{
	if (GroupExists(name) && GetUserData(id).Groups.Add(name.ToLower()))
	{
		Carbon.HookCaller.CallStaticHook(3116013984u, id, name);
	}
}

```
:::
