<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTeamAcceptInvite
```csharp
[ServerUserVar]
public static void acceptinvite(ConsoleSystem.Arg arg)
{
	BasePlayer basePlayer = UnityEngine.ArgEx.Player(arg);
	if (!(basePlayer == null) && basePlayer.currentTeam == 0L)
	{
		ulong uLong = arg.GetULong(0, 0uL);
		RelationshipManager.PlayerTeam playerTeam = ServerInstance.FindTeam(uLong);
		if (playerTeam == null)
		{
			basePlayer.ClearPendingInvite();
		}
		else
		{
			playerTeam.AcceptInvite(basePlayer);
		}
	}
}

```
