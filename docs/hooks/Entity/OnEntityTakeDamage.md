# OnEntityTakeDamage
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
Called when an entity takes damage. Allows plugins to react to or modify damage taken by any entity.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnEntityTakeDamage(BaseCombatEntity entity, HitInfo info)
{
	Puts("OnEntityTakeDamage has been fired!");
	return (bool)default;
}
```
:::
