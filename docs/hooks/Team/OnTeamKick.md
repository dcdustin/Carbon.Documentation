# OnTeamKick
<Badge type="info" text="Team"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a team member is kicked from the team.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTeamKick()
{
	Puts("OnTeamKick has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ RelationshipManager]
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
:::
