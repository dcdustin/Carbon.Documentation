<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTeamCreated
```csharp
[ServerUserVar]
public static void trycreateteam(ConsoleSystem.Arg arg)
{
	if (maxTeamSize == 0)
	{
		arg.ReplyWith("Teams are disabled on this server");
		return;
	}
	BasePlayer basePlayer = UnityEngine.ArgEx.Player(arg);
	if (basePlayer.currentTeam == 0L)
	{
		RelationshipManager.PlayerTeam playerTeam = ServerInstance.CreateTeam();
		playerTeam.teamLeader = basePlayer.userID;
		playerTeam.AddPlayer(basePlayer);
		Facepunch.Rust.Analytics.Azure.OnTeamChanged("created", playerTeam.teamID, basePlayer.userID, basePlayer.userID, playerTeam.members);
	}
}

```
