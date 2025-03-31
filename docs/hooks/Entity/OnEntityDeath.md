# OnEntityDeath
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an entity dies or is destroyed (e.g., NPC death or entity destruction).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnEntityDeath(ResourceEntity resourceEntity)
{
	Puts("OnEntityDeath has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ResourceEntity]
public virtual void OnDied(HitInfo info)
{
	isKilled = true;
	Kill();
}

```
:::
