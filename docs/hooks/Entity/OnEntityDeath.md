<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityDeath
Called when an entity dies or is destroyed (e.g., NPC death or entity destruction).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnEntityDeath()
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
