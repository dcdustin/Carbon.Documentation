<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnUserNameUpdated
```csharp
public virtual void UpdateNickname(string id, string nickname)
{
	if (UserExists(id))
	{
		Oxide.Core.Libraries.UserData userData = GetUserData(id);
		string lastSeenNickname = userData.LastSeenNickname;
		userData.LastSeenNickname = nickname.Sanitize();
		Carbon.HookCaller.CallStaticHook(4255507790u, id, lastSeenNickname, userData.LastSeenNickname);
	}
}

```
