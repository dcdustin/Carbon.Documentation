<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTeamKick
```csharp
[ServerUserVar]
public static void kickmember(ConsoleSystem.Arg arg)
{
	BasePlayer basePlayer = UnityEngine.ArgEx.Player(arg);
	if (basePlayer == null)
	{
		return;
	}
	RelationshipManager.PlayerTeam playerTeam = ServerInstance.FindTeam(basePlayer.currentTeam);
	if (playerTeam != null && !(playerTeam.GetLeader() != basePlayer))
	{
		ulong uLong = arg.GetULong(0, 0uL);
		if ((ulong)basePlayer.userID != uLong)
		{
			playerTeam.RemovePlayer(uLong);
		}
	}
}

```
