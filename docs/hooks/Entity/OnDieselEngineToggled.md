<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDieselEngineToggled [on]
```csharp
public void EngineOn()
{
	SetFlag(BaseEntity.Flags.On, b: true);
	BroadcastEntityMessage("DieselEngineOn");
}

```
