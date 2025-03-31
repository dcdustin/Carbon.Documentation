# OnTeamCreated
<Badge type="info" text="Team"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a new team has been created.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnTeamCreated(BasePlayer local0)
{
	Puts("OnTeamCreated has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ RelationshipManager]
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
:::
