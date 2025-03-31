<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTeamDisband
Called when a team is about to be disbanded.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTeamDisband()
{
	Puts("OnTeamDisband has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ RelationshipManager]
public void DisbandTeam(RelationshipManager.PlayerTeam teamToDisband)
{
	teams.Remove(teamToDisband.teamID);
	Facepunch.Pool.Free(ref teamToDisband);
}

```
:::
