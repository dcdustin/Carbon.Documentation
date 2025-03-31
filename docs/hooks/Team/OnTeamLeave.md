# OnTeamLeave
<Badge type="info" text="Team"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a team member leaves the team.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTeamLeave(RelationshipManager.PlayerTeam local1, BasePlayer local0)
{
	Puts("OnTeamLeave has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ RelationshipManager]
[ServerUserVar]
public static void leaveteam(ConsoleSystem.Arg arg)
{
	BasePlayer basePlayer = UnityEngine.ArgEx.Player(arg);
	if (!(basePlayer == null) && basePlayer.currentTeam != 0L)
	{
		RelationshipManager.PlayerTeam playerTeam = ServerInstance.FindTeam(basePlayer.currentTeam);
		if (playerTeam != null)
		{
			playerTeam.RemovePlayer(basePlayer.userID);
			basePlayer.ClearTeam();
		}
	}
}

```
:::
