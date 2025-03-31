<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityLeave
Called when an entity leaves a trigger volume (no longer inside a zone or trigger area).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEntityLeave()
{
	Puts("OnEntityLeave has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ TriggerComfort]
public override void OnEntityLeave(BaseEntity ent)
{
	if (ent is BasePlayer || ent is RidableHorse || ent is RidableHorse2)
	{
		_entities.Remove(ent);
	}
}

```
:::
