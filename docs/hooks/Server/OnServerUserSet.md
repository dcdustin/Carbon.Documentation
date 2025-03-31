<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnServerUserSet
```csharp
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
