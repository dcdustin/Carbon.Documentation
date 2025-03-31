# OnUserGroupAdded
<Badge type="info" text="Permissions"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
Called when a user is added to a permission group.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserGroupAdded(string playerId, string group)
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
