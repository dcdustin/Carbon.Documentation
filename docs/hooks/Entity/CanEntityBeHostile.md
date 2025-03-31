<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanEntityBeHostile [BasePlayer]
```csharp
public override bool IsHostile()
{
	return State.unHostileTimestamp > Network.TimeEx.currentTimestamp;
}

```
