# OnTeamRejectInvite
<Badge type="info" text="Team"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player rejects a team invitation.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTeamRejectInvite(BasePlayer local0, RelationshipManager.PlayerTeam local2)
{
	Puts("OnTeamRejectInvite has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ RelationshipManager]
[ServerUserVar]
public static void rejectinvite(ConsoleSystem.Arg arg)
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
			playerTeam.RejectInvite(basePlayer);
		}
	}
}

```
:::
