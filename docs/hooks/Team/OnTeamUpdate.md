# OnTeamUpdate
<Badge type="info" text="Team"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when team data is about to be updated.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTeamUpdate()
{
	Puts("OnTeamUpdate has been fired!");
	return (System.Object)default;
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
