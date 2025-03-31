<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerMetabolize
```csharp
public override void ServerUpdate(BaseCombatEntity ownerEntity, float delta)
{
	base.ServerUpdate(ownerEntity, delta);
	SendChangesToClient();
}

```
