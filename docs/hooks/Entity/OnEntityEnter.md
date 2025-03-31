<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityEnter [TriggerComfort]
```csharp
public override void OnEntityEnter(BaseEntity ent)
{
	if (ent is BasePlayer || ent is RidableHorse || ent is RidableHorse2)
	{
		_entities.Add(ent);
	}
}

```
