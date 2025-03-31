<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTeamDisband
```csharp
public void DisbandTeam(RelationshipManager.PlayerTeam teamToDisband)
{
	teams.Remove(teamToDisband.teamID);
	Facepunch.Pool.Free(ref teamToDisband);
}

```
