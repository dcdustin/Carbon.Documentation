<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityLeave [TriggerComfort]
```csharp
public override void OnEntityLeave(BaseEntity ent)
{
	if (ent is BasePlayer || ent is RidableHorse || ent is RidableHorse2)
	{
		_entities.Remove(ent);
	}
}

```
