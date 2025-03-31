<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnClanMemberAdded
```csharp
public bool AcceptInvite(long clanId, ulong steamId)
{
	BeginTransaction();
	try
	{
		if (DeleteInvite(clanId, steamId) && CreateMember(clanId, steamId))
		{
			Commit();
			return true;
		}
		Rollback();
		return false;
	}
	catch
	{
		Rollback();
		throw;
	}
}

```
