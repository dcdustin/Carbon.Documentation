<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTeamPromote
```csharp
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
