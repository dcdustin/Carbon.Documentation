# OnTeamUpdated
<Badge type="info" text="Team"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after team data has been updated.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTeamUpdated()
{
	Puts("OnTeamUpdated has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void TeamUpdate()
{
	TeamUpdate(fullTeamUpdate: false);
}

```
:::
