# CanEntityBeHostile
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when determining if an entity (e.g. a player or NPC) should be considered hostile. Plugins can override the hostility status.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanEntityBeHostile(BasePlayer basePlayer)
{
	Puts("CanEntityBeHostile has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public override bool IsHostile()
{
	return State.unHostileTimestamp > Network.TimeEx.currentTimestamp;
}

```
:::
