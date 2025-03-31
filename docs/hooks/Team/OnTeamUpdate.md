# OnTeamUpdate
<Badge type="info" text="Team"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when team data is about to be updated.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTeamUpdate(BasePlayer basePlayer, ulong newTeam, BasePlayer self1)
{
	Puts("OnTeamUpdate has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
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
:::
