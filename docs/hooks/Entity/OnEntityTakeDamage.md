<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityTakeDamage
Called when an entity takes damage. Allows plugins to react to or modify damage taken by any entity.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnEntityTakeDamage()
{
	Puts("OnEntityTakeDamage has been fired!");
	return (System.Boolean)default;
}
```
:::
