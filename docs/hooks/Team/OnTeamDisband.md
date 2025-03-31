# OnTeamDisband
<Badge type="info" text="Team"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a team is about to be disbanded.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTeamDisband()
{
	Puts("OnTeamDisband has been fired!");
	return (object)default;
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
