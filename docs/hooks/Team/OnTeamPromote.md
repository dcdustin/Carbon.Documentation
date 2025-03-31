# OnTeamPromote
<Badge type="info" text="Team"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a team member is promoted to team leader.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTeamPromote(RelationshipManager.PlayerTeam local2, BasePlayer local1)
{
	Puts("OnTeamPromote has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ RelationshipManager]
[ServerUserVar]
public static void promote(ConsoleSystem.Arg arg)
{
	BasePlayer basePlayer = UnityEngine.ArgEx.Player(arg);
	if (basePlayer.currentTeam == 0L)
	{
		return;
	}
	BasePlayer lookingAtPlayer = GetLookingAtPlayer(basePlayer);
	if (!(lookingAtPlayer == null) && !lookingAtPlayer.IsDead() && !(lookingAtPlayer == basePlayer) && lookingAtPlayer.currentTeam == basePlayer.currentTeam)
	{
		RelationshipManager.PlayerTeam playerTeam = ServerInstance.teams[basePlayer.currentTeam];
		if (playerTeam != null && playerTeam.teamLeader == (ulong)basePlayer.userID)
		{
			playerTeam.SetTeamLeader(lookingAtPlayer.userID);
		}
	}
}

```
:::
