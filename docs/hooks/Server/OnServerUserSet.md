# OnServerUserSet
<Badge type="info" text="Server"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an entry is added to the server's user list (ban, moderator, owner, etc.).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnServerUserSet()
{
	Puts("OnServerUserSet has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ServerUsers]
public static void Set(ulong uid, ServerUsers.UserGroup group, string username, string notes, long expiry = -1L)
{
	Remove(uid);
	ServerUsers.User value = new ServerUsers.User
	{
		steamid = uid,
		group = group,
		username = username,
		notes = notes,
		expiry = expiry
	};
	users.Add(uid, value);
}

```
:::
