# OnEntityPickedUp
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an entity (like a deployable item or structure piece) is picked up by a player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnEntityPickedUp()
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
