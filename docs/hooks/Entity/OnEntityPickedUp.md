# OnEntityPickedUp
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an entity (like a deployable item or structure piece) is picked up by a player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnEntityPickedUp(BaseCombatEntity baseCombatEntity)
{
	Puts("OnEntityPickedUp has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseCombatEntity]
public virtual void OnPickedUp(Item createdItem, BasePlayer player)
{
}

```
:::
