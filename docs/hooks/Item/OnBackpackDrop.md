# OnBackpackDrop
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player's backpack is dropped (e.g., on death).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBackpackDrop()
{
	Puts("OnBackpackDrop has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerInventory]
public void TryDropBackpack()
{
	Item anyBackpack = GetAnyBackpack();
	if (anyBackpack != null && base.baseEntity.isServer)
	{
		anyBackpack.Drop(base.baseEntity.GetDropPosition(), base.baseEntity.GetDropVelocity());
	}
}

```
:::
