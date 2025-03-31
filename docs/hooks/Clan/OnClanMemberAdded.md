<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnClanMemberAdded
Called when a player is added to a clan (e.g., after accepting a clan invite).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnClanMemberAdded()
{
	Puts("OnClanMemberAdded has been fired!");
}
```
```csharp [Source — Rust.Clans.Local @ LocalClanDatabase]
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
:::
