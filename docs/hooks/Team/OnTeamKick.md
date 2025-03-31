# OnTeamKick
<Badge type="info" text="Team"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a team member is kicked from the team.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTeamKick(RelationshipManager.PlayerTeam local1, BasePlayer local0, ulong local2)
{
	Puts("OnTeamKick has been fired!");
	return (object)default;
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
