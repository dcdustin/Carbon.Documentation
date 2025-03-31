<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanEntityBeHostile
Called when determining if an entity (e.g. a player or NPC) should be considered hostile. Plugins can override the hostility status.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanEntityBeHostile()
{
	Puts("CanEntityBeHostile has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public override bool IsHostile()
{
	return State.unHostileTimestamp > Network.TimeEx.currentTimestamp;
}

```
:::
