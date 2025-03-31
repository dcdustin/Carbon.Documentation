<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTeamUpdate
```csharp
public void UpdateTeam(ulong newTeam)
{
	currentTeam = newTeam;
	SendNetworkUpdate();
	if (RelationshipManager.ServerInstance.FindTeam(newTeam) == null)
	{
		ClearTeam();
	}
	else
	{
		TeamUpdate();
	}
}

```
