<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanBypassQueue
```csharp
public bool CanJumpQueue(Network.Connection connection)
{
	if (DeveloperList.Contains(connection.userid))
	{
		return true;
	}
	ServerUsers.User user = ServerUsers.Get(connection.userid);
	if (user != null && user.group == ServerUsers.UserGroup.Moderator)
	{
		return true;
	}
	if (user != null && user.group == ServerUsers.UserGroup.Owner)
	{
		return true;
	}
	if (user != null && user.group == ServerUsers.UserGroup.SkipQueue)
	{
		return true;
	}
	for (int i = 0; i < reservedSlots.Count; i++)
	{
		if (reservedSlots[i].UserId == connection.userid && reservedSlots[i].Expiry > UnityEngine.Time.realtimeSinceStartup)
		{
			return true;
		}
	}
	return false;
}

```
