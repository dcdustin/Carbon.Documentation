# OnEntityEnter
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an entity enters a trigger volume (such as an area trigger like comfort or building zone).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEntityEnter(TriggerComfort triggerComfort)
{
	Puts("OnEntityEnter has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ TriggerComfort]
public override void OnEntityEnter(BaseEntity ent)
{
	if (ent is BasePlayer || ent is RidableHorse || ent is RidableHorse2)
	{
		_entities.Add(ent);
	}
}

```
:::
