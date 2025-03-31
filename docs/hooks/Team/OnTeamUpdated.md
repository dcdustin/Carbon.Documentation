# OnTeamUpdated
<Badge type="info" text="Team"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after team data has been updated.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTeamUpdated(BasePlayer basePlayer, ProtoBuf.PlayerTeam local3, BasePlayer self1)
{
	Puts("OnTeamUpdated has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void TeamUpdate()
{
	TeamUpdate(fullTeamUpdate: false);
}

```
:::
