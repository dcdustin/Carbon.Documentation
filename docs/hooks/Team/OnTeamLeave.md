<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTeamLeave
```csharp
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
