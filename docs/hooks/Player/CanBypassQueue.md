<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanBypassQueue
Called to determine if a connecting player can bypass the connection queue (e.g., a priority slot).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanBypassQueue()
{
	Puts("CanBypassQueue has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ ConnectionQueue]
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
:::
