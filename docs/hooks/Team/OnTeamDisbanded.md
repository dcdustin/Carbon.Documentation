# OnTeamDisbanded
<Badge type="info" text="Team"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a team has been disbanded.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnTeamDisbanded()
{
	Puts("OnTeamDisbanded has been fired!");
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
